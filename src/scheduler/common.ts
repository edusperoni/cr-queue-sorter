
export interface Scheduler {
    schedule(): void
    callback?: ()=> any
}
