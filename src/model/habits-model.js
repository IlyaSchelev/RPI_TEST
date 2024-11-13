import { habits } from '../mock/habits.js';
import { status } from '../const.js';

export default class HabitsModel {
  boardhabits = habits;

  getHabits() {
    return this.boardhabits;
  }

  addHabit(habit) {
    this.boardhabits.push(habit);
  }

  removeHabit(habitId) {
    this.boardhabits = this.boardhabits.filter(habit => habit.id !== habitId);
  }

  updateHabit(id, updatedHabit) {
    const index = this.boardhabits.findIndex(habit => habit.id === id);
    if (index !== -1) {
      this.boardhabits[index] = { ...this.boardhabits[index], ...updatedHabit };
    }
  }
}
