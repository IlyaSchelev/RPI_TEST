// habits-board-presenter.js
import HabitsModel from '../model/habits-model.js';
import HabitsListComponent from '../view/habits-list-component.js';

export default class HabitsBoardPresenter {
  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
    this.habitsModel = new HabitsModel();
    this.habitsListComponent = new HabitsListComponent();
  }

  init() {
    this.renderHabitsList();
    this.setAddHabitHandler();
  }

  renderHabitsList() {
    const habits = this.habitsModel.getHabits();
    this.habitsListComponent.getElement().querySelector('#habit-list').innerHTML = ''; // Очистить текущий список
    habits.forEach(habit => this.habitsListComponent.renderHabit(habit, this.handleDeleteHabit.bind(this), this.handleEditHabit.bind(this), this.handleStatusChange.bind(this)));
    this.boardContainer.appendChild(this.habitsListComponent.getElement());
  }

  handleDeleteHabit(habitId) {
    this.habitsModel.removeHabit(habitId);
    this.renderHabitsList(); // Обновить отображение списка
  }

  handleEditHabit(habitId, updatedData) {
    this.habitsModel.updateHabit(habitId, updatedData);
    this.renderHabitsList(); // Обновить отображение списка
  }

  handleStatusChange(habitId, updatedData) {
    this.habitsModel.updateHabit(habitId, updatedData);
    this.renderHabitsList(); // Обновить отображение списка
  }

  setAddHabitHandler() {
    const formComponent = document.querySelector('.habit-form');
    formComponent.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const habitName = formComponent.querySelector('#habit-name').value.trim();
      if (habitName) {
        const newHabit = {
          id: Date.now().toString(), // Уникальный ID на основе времени
          name: habitName,
          status: 'nodone',
        };
        this.habitsModel.addHabit(newHabit);
        formComponent.querySelector('form').reset();
        this.renderHabitsList(); // Обновить список привычек
      }
    });
  }
}
