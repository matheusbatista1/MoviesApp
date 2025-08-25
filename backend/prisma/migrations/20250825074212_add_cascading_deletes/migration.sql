-- DropForeignKey
ALTER TABLE "public"."MovieImage" DROP CONSTRAINT "MovieImage_movieId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReleaseEmailSchedule" DROP CONSTRAINT "ReleaseEmailSchedule_movieId_fkey";

-- AddForeignKey
ALTER TABLE "public"."MovieImage" ADD CONSTRAINT "MovieImage_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReleaseEmailSchedule" ADD CONSTRAINT "ReleaseEmailSchedule_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
