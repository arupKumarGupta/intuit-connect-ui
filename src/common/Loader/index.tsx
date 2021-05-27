import classNames from 'classnames';
import React from 'react';
import ReactLoader from 'react-loader-spinner';
import './Loader.scss';
interface LoaderProps {
    containerClasses?: string[];
    width: number;
    height: number;
    color?: string;
    secondaryColor?: string;
}
export const Loader: React.FC<LoaderProps> = (props) => {
    const {
        containerClasses = [],
        height,
        width,
        color,
        secondaryColor,
    } = props;
    return (
        <div className={classNames('loader-container', ...containerClasses)}>
            <ReactLoader
                type="MutatingDots"
                color={color}
                secondaryColor={secondaryColor}
                height={height}
                width={width}
            />
        </div>
    );
};

Loader.defaultProps = {
    color: '#17597E',
    secondaryColor: '#870afc',
    containerClasses: [],
};
export default Loader;
