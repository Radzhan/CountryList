import React from 'react';

interface Props extends React.PropsWithChildren {

}

const Info: React.FC<Props> = ({ children }) => {
    return (
        <>
            <ul>
                {children}
            </ul>
        </>
    );
};

export default Info;