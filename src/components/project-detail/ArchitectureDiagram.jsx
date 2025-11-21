import React from 'react';
import FullStackArchitectureDiagram from '../architecture-diagrams/FullStackArchitectureDiagram';
import FxDCArchitectureDiagram from '../architecture-diagrams/FxDCArchitectureDiagram';
import FxPyArchitectureDiagram from '../architecture-diagrams/FxPyArchitectureDiagram';
import FeXoBotArchitectureDiagram from '../architecture-diagrams/FeXoBotArchitectureDiagram';
import FxQuestArchitectureDiagram from '../architecture-diagrams/FxQuestArchitectureDiagram';
import PortfolioWebsiteArchitectureDiagram from '../architecture-diagrams/PortfolioWebsiteArchitectureDiagram';

const ArchitectureDiagram = ({ projectName }) => {
  // Map project names to their specific diagram components
  const diagramComponents = {
    'Full-Stack-Template': FullStackArchitectureDiagram,
    'FedxD-Data-Container-FxDC': FxDCArchitectureDiagram,
    'FxPy': FxPyArchitectureDiagram,
    'FeXoBot': FeXoBotArchitectureDiagram,
    'FxQuest': FxQuestArchitectureDiagram,
    'Portfolio-Website': PortfolioWebsiteArchitectureDiagram,
  };

  // Get the specific diagram component for this project
  const DiagramComponent = diagramComponents[projectName];

  // If no specific diagram exists, show a message
  if (!DiagramComponent) {
    return (
      <div className="w-full p-8 bg-gray-900 rounded-lg border border-gray-700">
        <p className="text-gray-400 text-center">
          Architecture diagram not available for this project.
        </p>
      </div>
    );
  }

  return <DiagramComponent />;
};

export default ArchitectureDiagram;
