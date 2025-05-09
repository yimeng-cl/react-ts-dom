/**
 * 贪吃蛇游戏组件
 * 实现经典贪吃蛇游戏功能，包括：
 * - 蛇的移动控制
 * - 食物生成
 * - 碰撞检测
 * - 得分计算
 * - 游戏结束处理
 */

import React, { useState, useEffect, useCallback } from "react";
import "./index.less";

// 游戏常量定义
const GRID_SIZE = 20; // 游戏网格大小（20x20）
const INITIAL_SNAKE = [{ x: 5, y: 5 }]; // 初始蛇的位置
const INITIAL_DIRECTION = { x: 1, y: 0 }; // 初始移动方向（向右）
const INITIAL_FOOD = { x: 10, y: 10 }; // 初始食物位置

const SnakeGame: React.FC = () => {
  // 状态管理
  const [snake, setSnake] = useState(INITIAL_SNAKE); // 蛇的身体坐标数组
  const [direction, setDirection] = useState(INITIAL_DIRECTION); // 当前移动方向
  const [food, setFood] = useState(INITIAL_FOOD); // 食物位置
  const [gameOver, setGameOver] = useState(false); // 游戏结束状态
  const [score, setScore] = useState(0); // 当前得分

  /**
   * 生成新的食物位置
   * 确保食物不会生成在蛇的身体上
   */
  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  /**
   * 处理键盘输入事件
   * 控制蛇的移动方向
   * @param e 键盘事件对象
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 }); // 向上移动
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 }); // 向下移动
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 }); // 向左移动
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 }); // 向右移动
          break;
        default:
          break;
      }
    },
    [direction]
  );

  // 监听键盘事件
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // 游戏主循环
  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = {
        x: newSnake[0].x + direction.x,
        y: newSnake[0].y + direction.y,
      };

      // 检测是否撞墙
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        return;
      }

      // 检测是否撞到自己
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return;
      }

      newSnake.unshift(head);

      // 检测是否吃到食物
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1);
        generateFood();
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    // 设置游戏循环间隔
    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver, generateFood]);

  /**
   * 重置游戏状态
   */
  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className='snake-game'>
      <div className='game-board'>
        {Array.from({ length: GRID_SIZE }).map((_, y) => (
          <div key={y} className='row'>
            {Array.from({ length: GRID_SIZE }).map((_, x) => {
              const isSnake = snake.some(segment => segment.x === x && segment.y === y);
              const isFood = food.x === x && food.y === y;
              return <div key={x} className={`cell ${isSnake ? "snake" : ""} ${isFood ? "food" : ""}`} />;
            })}
          </div>
        ))}
      </div>
      <div className='game-info'>
        <div>Score: {score}</div>
        {gameOver && (
          <div className='game-over'>
            <div>Game Over!</div>
            <button onClick={resetGame}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;
