import React from 'react';
import styled from 'styled-components';

const SectionWrapper = styled.div`
  margin: 16px 0;
  background: #161B22;
  border-radius: 8px;
  padding: 16px;
  width: 45%
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

const SectionLink = styled.a`
  color: #F79E1B;
  text-decoration: none;
`;

const Section = ({ title, linkText, linkHref, children }) => (
  <SectionWrapper>
    <SectionHeader>
      <SectionTitle>{title}</SectionTitle>
      <SectionLink href={linkHref}>{linkText}</SectionLink>
    </SectionHeader>
    {children}
  </SectionWrapper>
);

export default Section;
