export interface TimeEntry {
  id: string;
  taskName: string;
  hours: number;
  startTime?: Date | null;
  isRunning?: boolean;
}