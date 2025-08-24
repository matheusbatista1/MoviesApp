import cron from "node-cron";
import { ScheduleService } from "./modules/movies/schedule.service";

// roda a cada minuto
cron.schedule("* * * * *", async () => {
  console.log("Verificando emails pendentes...");
  await ScheduleService.sendPendingReleaseEmails();
});