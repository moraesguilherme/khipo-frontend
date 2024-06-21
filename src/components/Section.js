import React from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.div`
  margin: 16px 0;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  color: white;
`;

const Section = ({ title, children }) => (
  <SectionWrapper>
    <SectionHeader>
      <SectionTitle>{title}</SectionTitle>
    </SectionHeader>
    {children}
  </SectionWrapper>
);

export default Section;
