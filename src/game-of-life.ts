export class GameOfLife {
  private grid: number[][];
  private w: number;
  private h: number;

  constructor(width: number, height: number, initialState?: number[][]) {
    this.w = width;
    this.h = height;
    if (initialState) {
      this.grid = initialState;
    } else {
      this.grid = [];
      for (let i = 0; i < height; i++) {
        this.grid[i] = [];
        for (let j = 0; j < width; j++) {
          this.grid[i][j] = 0;
        }
      }
    }
  }

  public setCell(x: number, y: number, value: number) {
    if (x >= 0 && x < this.w && y >= 0 && y < this.h) {
      this.grid[y][x] = value;
    }
  }

  public getCell(x: number, y: number): number {
    if (x >= 0 && x < this.w && y >= 0 && y < this.h) {
      return this.grid[y][x];
    }
    return 0;
  }

  public getGrid(): number[][] {
    return this.grid;
  }

  public tick() {
    const newGrid: number[][] = [];
    for (let i = 0; i < this.h; i++) {
      newGrid[i] = [];
      for (let j = 0; j < this.w; j++) {
        newGrid[i][j] = 0;
      }
    }

    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        let count = 0;

        if (x > 0 && y > 0 && this.grid[y - 1][x - 1] === 1) count++;
        if (y > 0 && this.grid[y - 1][x] === 1) count++;
        if (x < this.w - 1 && y > 0 && this.grid[y - 1][x + 1] === 1) count++;
        if (x > 0 && this.grid[y][x - 1] === 1) count++;
        if (x < this.w - 1 && this.grid[y][x + 1] === 1) count++;
        if (x > 0 && y < this.h - 1 && this.grid[y + 1][x - 1] === 1) count++;
        if (y < this.h - 1 && this.grid[y + 1][x] === 1) count++;
        if (x < this.w - 1 && y < this.h - 1 && this.grid[y + 1][x + 1] === 1) count++;

        if (this.grid[y][x] === 1) {
          if (count === 2 || count === 3) {
            newGrid[y][x] = 1;
          } else {
            newGrid[y][x] = 0;
          }
        } else {
          if (count === 3) {
            newGrid[y][x] = 1;
          } else {
            newGrid[y][x] = 0;
          }
        }
      }
    }

    this.grid = newGrid;
  }

  public getCellCount(): number {
    let count = 0;
    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        if (this.grid[i][j] === 1) {
          count++;
        }
      }
    }
    return count;
  }

  public clear() {
    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        this.grid[i][j] = 0;
      }
    }
  }

  public loadPattern(pattern: string, offsetX: number, offsetY: number) {
    const lines = pattern.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (let j = 0; j < line.length; j++) {
        if (line[j] === 'O' || line[j] === 'o' || line[j] === '*') {
          this.setCell(offsetX + j, offsetY + i, 1);
        }
      }
    }
  }
}
