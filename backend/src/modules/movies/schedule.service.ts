// src/modules/movies/schedule.service.ts
import { PrismaClient } from "@prisma/client";
import { EmailService } from "../email/email.service";

const prisma = new PrismaClient();

export class ScheduleService {
  static async sendPendingReleaseEmails() {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setUTCDate(today.getUTCDate() + 1);

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setUTCHours(23, 59, 59, 999);

    const moviesToSend = await prisma.movie.findMany({
      where: {
        releaseDate: {
          gte: tomorrow,
          lte: dayAfterTomorrow,
        },
      },
      include: {
        user: true,
      },
    });

    for (const movie of moviesToSend) {
      if (!movie.user?.email) continue;

      try {
        await EmailService.sendReleaseEmail(
          movie.user.email,
          movie.title,
          movie.releaseDate
        );
        console.log(
          `Email enviado para ${movie.user.email} sobre ${movie.title}`
        );
      } catch (err) {
        console.error("Erro ao enviar email:", err);
      }
    }
  }
}
