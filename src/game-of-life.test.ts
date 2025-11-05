import { describe, it, expect, beforeEach } from 'vitest';
import { GameOfLife } from './game-of-life';
import { getBlinkerPattern, getGliderPattern, getBlockPattern, getToadPattern, getBeaconPattern } from './patterns';

describe('GameOfLife Integration Tests', () => {
  describe('Basic Grid Operations', () => {
    it('should create an empty grid', () => {
      const game = new GameOfLife(5, 5);
      expect(game.getCellCount()).toBe(0);
    });

    it('should set and get cells correctly', () => {
      const game = new GameOfLife(5, 5);
      game.setCell(2, 2, 1);
      expect(game.getCell(2, 2)).toBe(1);
      expect(game.getCell(1, 1)).toBe(0);
    });

    it('should handle boundary conditions', () => {
      const game = new GameOfLife(5, 5);
      game.setCell(-1, -1, 1);
      game.setCell(10, 10, 1);
      expect(game.getCellCount()).toBe(0);
    });

    it('should clear the grid', () => {
      const game = new GameOfLife(5, 5);
      game.setCell(1, 1, 1);
      game.setCell(2, 2, 1);
      game.clear();
      expect(game.getCellCount()).toBe(0);
    });
  });

  describe('Conway\'s Rules - Underpopulation', () => {
    it('should kill a cell with no neighbors', () => {
      const game = new GameOfLife(5, 5);
      game.setCell(2, 2, 1);
      game.tick();
      expect(game.getCell(2, 2)).toBe(0);
    });

    it('should kill a cell with one neighbor', () => {
      const game = new GameOfLife(5, 5);
      game.setCell(2, 2, 1);
      game.setCell(2, 3, 1);
      game.tick();
      expect(game.getCell(2, 2)).toBe(0);
      expect(game.getCell(2, 3)).toBe(0);
    });
  });

  describe('Conway\'s Rules - Survival', () => {
    it('should keep a cell alive with 2 neighbors', () => {
      const game = new GameOfLife(5, 5);
      game.setCell(1, 1, 1);
      game.setCell(2, 1, 1);
      game.setCell(3, 1, 1);
      game.tick();
      expect(game.getCell(2, 1)).toBe(1);
    });

    it('should keep a cell alive with 3 neighbors', () => {
      const game = new GameOfLife(5, 5);
      game.setCell(2, 2, 1);
      game.setCell(1, 1, 1);
      game.setCell(2, 1, 1);
      game.setCell(3, 1, 1);
      game.tick();
      expect(game.getCell(2, 2)).toBe(1);
    });
  });

  describe('Conway\'s Rules - Overpopulation', () => {
    it('should kill a cell with 4 neighbors', () => {
      const game = new GameOfLife(5, 5);
      game.setCell(2, 2, 1);
      game.setCell(1, 1, 1);
      game.setCell(2, 1, 1);
      game.setCell(3, 1, 1);
      game.setCell(1, 2, 1);
      game.tick();
      expect(game.getCell(2, 2)).toBe(0);
    });
  });

  describe('Conway\'s Rules - Reproduction', () => {
    it('should create a new cell with exactly 3 neighbors', () => {
      const game = new GameOfLife(5, 5);
      game.setCell(1, 1, 1);
      game.setCell(2, 1, 1);
      game.setCell(3, 1, 1);
      game.tick();
      expect(game.getCell(2, 0)).toBe(1);
      expect(game.getCell(2, 2)).toBe(1);
    });
  });

  describe('Pattern: Blinker (Period 2 oscillator)', () => {
    it('should oscillate horizontally and vertically', () => {
      const game = new GameOfLife(5, 5);
      game.loadPattern(getBlinkerPattern(), 1, 1);

      const initialGrid = JSON.stringify(game.getGrid());

      game.tick();
      const afterOneTick = JSON.stringify(game.getGrid());
      expect(afterOneTick).not.toBe(initialGrid);

      game.tick();
      const afterTwoTicks = JSON.stringify(game.getGrid());
      expect(afterTwoTicks).toBe(initialGrid);
    });
  });

  describe('Pattern: Block (Still life)', () => {
    it('should remain stable', () => {
      const game = new GameOfLife(6, 6);
      game.loadPattern(getBlockPattern(), 2, 2);

      const initialGrid = JSON.stringify(game.getGrid());

      game.tick();
      expect(JSON.stringify(game.getGrid())).toBe(initialGrid);

      game.tick();
      expect(JSON.stringify(game.getGrid())).toBe(initialGrid);
    });
  });

  describe('Pattern: Glider (Spaceship)', () => {
    it('should move diagonally across the grid', () => {
      const game = new GameOfLife(20, 20);
      game.loadPattern(getGliderPattern(), 1, 1);

      const initialCount = game.getCellCount();
      expect(initialCount).toBe(5);

      for (let i = 0; i < 4; i++) {
        game.tick();
      }

      expect(game.getCellCount()).toBe(5);

      const cell1_1 = game.getCell(1, 1);
      expect(cell1_1).toBe(0);
    });
  });

  describe('Pattern: Toad (Period 2 oscillator)', () => {
    it('should oscillate between two states', () => {
      const game = new GameOfLife(8, 8);
      game.loadPattern(getToadPattern(), 2, 3);

      const initialGrid = JSON.stringify(game.getGrid());

      game.tick();
      const afterOneTick = JSON.stringify(game.getGrid());
      expect(afterOneTick).not.toBe(initialGrid);

      game.tick();
      const afterTwoTicks = JSON.stringify(game.getGrid());
      expect(afterTwoTicks).toBe(initialGrid);
    });
  });

  describe('Pattern: Beacon (Period 2 oscillator)', () => {
    it('should oscillate between two states', () => {
      const game = new GameOfLife(8, 8);
      game.loadPattern(getBeaconPattern(), 2, 2);

      const initialGrid = JSON.stringify(game.getGrid());

      game.tick();
      const afterOneTick = JSON.stringify(game.getGrid());
      expect(afterOneTick).not.toBe(initialGrid);

      game.tick();
      const afterTwoTicks = JSON.stringify(game.getGrid());
      expect(afterTwoTicks).toBe(initialGrid);
    });
  });

  describe('Multiple Patterns on Same Grid', () => {
    it('should handle multiple patterns without interference', () => {
      const game = new GameOfLife(30, 30);

      game.loadPattern(getBlockPattern(), 5, 5);
      game.loadPattern(getBlockPattern(), 20, 20);

      const initialCount = game.getCellCount();

      for (let i = 0; i < 10; i++) {
        game.tick();
      }

      expect(game.getCellCount()).toBe(initialCount);
    });
  });

  describe('Edge Cases', () => {
    it('should handle patterns at grid boundaries', () => {
      const game = new GameOfLife(10, 10);
      game.loadPattern(getBlockPattern(), 0, 0);
      game.loadPattern(getBlockPattern(), 8, 8);

      const initialCount = game.getCellCount();
      game.tick();
      expect(game.getCellCount()).toBe(initialCount);
    });

    it('should handle large grids efficiently', () => {
      const game = new GameOfLife(100, 100);
      game.loadPattern(getGliderPattern(), 10, 10);

      for (let i = 0; i < 50; i++) {
        game.tick();
      }

      expect(game.getCellCount()).toBeGreaterThan(0);
    });
  });

  describe('Grid State Management', () => {
    it('should create game with initial state', () => {
      const initialState = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ];
      const game = new GameOfLife(3, 3, initialState);
      expect(game.getCellCount()).toBe(3);
    });

    it('should return correct grid representation', () => {
      const game = new GameOfLife(3, 3);
      game.setCell(0, 0, 1);
      game.setCell(1, 1, 1);
      game.setCell(2, 2, 1);

      const grid = game.getGrid();
      expect(grid[0][0]).toBe(1);
      expect(grid[1][1]).toBe(1);
      expect(grid[2][2]).toBe(1);
      expect(grid[0][1]).toBe(0);
    });
  });
});
