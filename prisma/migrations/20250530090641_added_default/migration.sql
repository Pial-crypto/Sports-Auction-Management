-- AlterTable
ALTER TABLE "Practice" ALTER COLUMN "tournamentId" SET DEFAULT 'default-tournament',
ALTER COLUMN "teamId" SET DEFAULT 'default-team',
ALTER COLUMN "coach" SET DEFAULT 'default-coach',
ALTER COLUMN "date" SET DEFAULT '2025-01-01',
ALTER COLUMN "duration" SET DEFAULT '1h',
ALTER COLUMN "focus" SET DEFAULT 'General fitness',
ALTER COLUMN "status" SET DEFAULT 'upcoming',
ALTER COLUMN "time" SET DEFAULT '10:00',
ALTER COLUMN "title" SET DEFAULT 'Practice Session',
ALTER COLUMN "venue" SET DEFAULT 'Main Ground';
