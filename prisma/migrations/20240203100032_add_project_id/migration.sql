-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL,
    "date" TEXT
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_key" ON "Task"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");
