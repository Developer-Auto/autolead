const { onSchedule } = require("firebase-functions/v2/scheduler");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");

initializeApp();

const APP_URL = "https://developer-auto.github.io/autolead/autolead-app/";
const ICON_URL = APP_URL + "assets/icon.svg";

// Runs every day at 8:00 AM Israel time
exports.sendDailyFollowUpReminders = onSchedule(
  {
    schedule: "0 8 * * *",
    timeZone: "Asia/Jerusalem",
    region: "europe-west1",
  },
  async () => {
    const db = getFirestore();
    const messaging = getMessaging();
    const today = new Date().toISOString().slice(0, 10);

    const usersSnap = await db.collection("users")
      .where("fcmToken", "!=", null)
      .get();

    const promises = usersSnap.docs.map(async (userDoc) => {
      const user = userDoc.data();
      if (!user.fcmToken || user.subscriptionStatus === "pending") return;

      const leadsSnap = await db.collection("leads")
        .where("ownerUid", "==", user.uid)
        .where("nextFollowUpDate", "<=", today)
        .get();

      const active = leadsSnap.docs
        .map((d) => d.data())
        .filter((l) => l.status !== "נסגר" && l.status !== "אבוד" && l.nextFollowUpDate);

      if (!active.length) return;

      const overdue = active.filter((l) => l.nextFollowUpDate < today).length;
      const todayCount = active.filter((l) => l.nextFollowUpDate === today).length;

      let title, body;
      if (overdue > 0 && todayCount > 0) {
        title = `AutoLead — ${active.length} לידים מחכים`;
        body = `${todayCount} להיום + ${overdue} באיחור`;
      } else if (overdue > 0) {
        const name = active[0].customerName || "ליד";
        title = `AutoLead — ${overdue} לידים באיחור`;
        body = overdue === 1 ? `${name} ממתין לטיפול` : `${name} ועוד ${overdue - 1} ממתינים`;
      } else {
        title = `AutoLead — ${todayCount} מעקבים להיום`;
        body = `יש לך ${todayCount} ${todayCount === 1 ? "מעקב" : "מעקבים"} מתוכננים להיום`;
      }

      try {
        await messaging.send({
          token: user.fcmToken,
          notification: { title, body },
          webpush: {
            notification: {
              icon: ICON_URL,
              badge: ICON_URL,
              tag: "autolead-daily",
              renotify: true,
            },
            fcmOptions: { link: APP_URL },
          },
        });
      } catch (err) {
        if (err.code === "messaging/registration-token-not-registered") {
          await userDoc.ref.update({ fcmToken: null });
        } else {
          console.error(`Push failed for ${user.uid}:`, err.message);
        }
      }
    });

    await Promise.allSettled(promises);
  }
);
