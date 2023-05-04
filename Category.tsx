import React, { FC } from 'react';
import styled from 'styled-components';

interface CategoryProps {
  name: string;
  isSelected: boolean;
  onToggleCategory: () => void;
}

const CategoryBubble = styled.div<{ isSelected: boolean }>`
  display: grid;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  background-color: ${({ isSelected }) => (isSelected ? '#007aff' : '#ffffff')};
  box-shadow: 0 18px 4px 0 rgba(0, 0, 0, 0.25);
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#000')};
  width: ${({ isSelected }) => (isSelected ? '15rem' : '10rem')};
  height: ${({ isSelected }) => (isSelected ? '15rem' : '10rem')};
  margin: 2rem;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #007aff;
    color: #fff;
  }
`;

export const Category: FC<CategoryProps> = ({
  name,
  isSelected,
  onToggleCategory,
}) => {
  return (
    <>
      <CategoryBubble onClick={onToggleCategory} isSelected={isSelected}>
        {name}
      </CategoryBubble>
    </>
  );
};
