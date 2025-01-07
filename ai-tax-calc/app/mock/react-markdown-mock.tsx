//to ignore common issue for jest and react-markdown
import type { ReactNode } from "react";

interface ChildrenProps {
    children: ReactNode;
}

function ReactMarkdownMock({ children }: ChildrenProps) {
    return <p>{children}</p>;
}

export default ReactMarkdownMock;