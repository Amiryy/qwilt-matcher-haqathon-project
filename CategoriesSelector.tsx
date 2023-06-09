import React, { useState } from 'react';
import styled from 'styled-components';
import { CategoryType, SlackChannelType, TempUserType } from './data';
import { Category } from './Category';
import { Results } from './Results';

interface Props {
  data: CategoryType[];
  currentUser: TempUserType;
}

const ControlsDiv = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  padding: 1rem 0;
  width: 100vw;
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-gap: 1rem;
  button {
    border: 1px solid black;
    border-radius: 1rem;
    background: #26929B;
    padding: 0.5rem 1rem;
    color: white;
    font-weight: 600;
    font-size: 2rem;
    &:focus {outline: none;}
    cursor: pointer;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-y: auto;
`;

const CategoriesSelectorContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: minmax(400px,90vh) max-content;
`;

const TitleSpn = styled.div`
  width: 100vw;
  text-align: center;
  font-weight: 600;
  font-size: 2rem;
  color: white;
`;

const StepCategories: React.FC<{
  data: CategoryType[];
  selectedCategories: CategoryType[];
  onChange: (categoryName: string, selectedIndex: number) => void;
}> = (props) => {
  return (
    <>
      <TitleSpn>Choose one or more favorite interests</TitleSpn>
      {props.data.map((category) => {
        const selectedIndex = props.selectedCategories.findIndex(
          (c) => c.name === category.name
        );
        return (
          <Category
            key={category.name}
            name={category.name}
            isSelected={selectedIndex > -1}
            onToggleCategory={() => {
              props.onChange(category.name, selectedIndex);
            }}
          />
        );
      })}
    </>
  );
};

const StepActivities: React.FC<{
  data: CategoryType[];
  selectedCategories: CategoryType[];
  onChange: (
    activityName: string,
    selectedIndex: number,
    categoryIndex: number
  ) => void;
}> = (props) => {
  return (
    <>
      <TitleSpn>Choose one or more activity</TitleSpn>
      {props.selectedCategories.flatMap((selectedCategory, categoryIndex) => {
        const categoryFromData = props.data.find(
          (c) => c.name === selectedCategory.name
        );
        return categoryFromData?.activities.map((activity) => {
          const selectedIndex = selectedCategory.activities.findIndex(
            (a) => a.name === activity.name
          );
          return (
            <Category
              key={activity.name}
              name={activity.name}
              isSelected={selectedIndex > -1}
              onToggleCategory={() => {
                props.onChange(activity.name, selectedIndex, categoryIndex);
              }}
            />
          );
        });
      })}
    </>
  );
};

const CategoriesSelector: React.FC<Props> = (props) => {
  const [step, setStep] = useState<number>(0);
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(
    []
  );
  const [results, setResults] = useState<SlackChannelType[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState<boolean>(true);
  const BackButton: React.FC = () => {
    return (
      <button
        onClick={() =>
          setStep((prev) => {
            if (
              prev === 2 &&
              props.data
                .filter((cat) =>
                  selectedCategories.some((c) => c.name === cat.name)
                )
                .flatMap((c) => c.activities).length === 0
            ) {
              return 0;
            } else {
              return Math.max(0, prev - 1);
            }
          })
        }
      >
        Go Back
      </button>
    );
  };

  const NextButton: React.FC = () => {
    const nextStep =
      step === 0 &&
      props.data
        .filter((cat) => selectedCategories.some((c) => c.name === cat.name))
        .flatMap((c) => c.activities).length === 0
        ? 2
        : step + 1;

    return (
      <button
        onClick={() => {
          if (nextStep === 2) {
            fetch(
              'https://zone.control.dt-euw2.ecp-rnd.cqloud.com/qwilder-api/user-data',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ...props.currentUser,
                  categories: selectedCategories,
                }),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                setIsLoadingResults(false);
                console.log(data);
                setResults(
                  typeof data === 'string' ? JSON.parse(data) : data.groups
                );
              })
              .catch((e) => {
                setIsLoadingResults(false);
                console.error(e);
              });
          }
          setStep(nextStep);
        }}
      >
        {nextStep === 2 ? 'Done' : 'Next'}
      </button>
    );
  };

  const isCategoryStepDone = step === 0 && selectedCategories.length > 0;
  const isActivityStepDone =
    step === 1 && selectedCategories.flatMap((c) => c.activities).length > 0;

  const onStepCategoryChange = (
    categoryName: string,
    selectedIndex: number
  ) => {
    setSelectedCategories((prev) =>
      selectedIndex > -1
        ? [...prev.slice(0, selectedIndex), ...prev.slice(selectedIndex + 1)]
        : [...prev, { name: categoryName, activities: [] }]
    );
  };

  const onStepActivityChange = (activityName, selectedIndex, categoryIndex) => {
    setSelectedCategories((prev) =>
      prev.map((c, i) =>
        i === categoryIndex
          ? {
              ...c,
              activities:
                selectedIndex > -1
                  ? [
                      ...c.activities.slice(0, selectedIndex),
                      ...c.activities.slice(selectedIndex + 1),
                    ]
                  : [...c.activities, { name: activityName }],
            }
          : c
      )
    );
  };
  return (
    <CategoriesSelectorContainer>
      <ContentContainer>
        {step === 0 ? (
          <StepCategories
            data={props.data}
            selectedCategories={selectedCategories}
            onChange={onStepCategoryChange}
          />
        ) : step === 1 ? (
          <StepActivities
            data={props.data}
            selectedCategories={selectedCategories}
            onChange={onStepActivityChange}
          />
        ) : step === 2 ? (
          <Results isLoading={isLoadingResults} slackChannels={results} />
        ) : null}
      </ContentContainer>
      <ControlsDiv>
        {step > 0 ? <BackButton /> : null}
        {isCategoryStepDone || isActivityStepDone ? <NextButton /> : null}
      </ControlsDiv>
    </CategoriesSelectorContainer>
  );
};

export default CategoriesSelector;
