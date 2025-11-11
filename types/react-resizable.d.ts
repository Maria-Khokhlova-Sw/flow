import * as React from 'react';

declare module 'react-resizable' {
    export interface ResizableBoxProps {
        width: number;
        height?: number;
        minConstraints?: [number, number];
        maxConstraints?: [number, number];
        axis?: 'x' | 'y' | 'both' | 'none';
        resizeHandles?: Array<'s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'>;
        onResize?: (e: React.SyntheticEvent, data: { size: { width: number; height: number } }) => void;
        children: React.ReactNode;
    }

    export class ResizableBox extends React.Component<ResizableBoxProps> {}
}