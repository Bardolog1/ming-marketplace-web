import React from 'react';
import styled from 'styled-components';

const TextDefault = ({type, darkMode, ...props}) => {

    const Title = styled.h1`
        font-size: 1.5rem;
        color: var(--color-foreground);
        font-weight: 800;

        &.ambiented {
        color: var(--color-foreground);
        }

    `;

    const SubTitle = styled.h2`
        font-size: 1.2rem;
        color: var(--color-foreground);
        font-weight: 500;

        &.ambiented {
        color: var(--color-foreground);
        }
    `;

    const ButtonText = styled.p`
        font-size: 1rem;
        font-weight: 600;
        color: var(--color-foreground);

        &.ambiented {
        color: var(--color-foreground);
        }
    `;

    const Paragraph = styled.p`
        font-size: 1rem;
        color: var(--color-foreground);

        &.ambiented {
        color: var(--color-foreground);
        }
    `;


  return (
    <>
        {
            type === 'title' ? <Title className={darkMode ? "ambiented" : ""} {...props} /> :
            type === 'subtitle' ? <SubTitle  className={darkMode ? "ambiented" : ""}{...props} /> :
            type === 'buttonText' ? <ButtonText  className={darkMode ? "ambiented" : ""}{...props} /> :
            <Paragraph  className={darkMode ? "ambiented" : ""}{...props} />
           
        }
    </>
  )
}

export default TextDefault