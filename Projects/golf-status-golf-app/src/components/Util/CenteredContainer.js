import {styled} from "@material-ui/core";

export const CenteredContainer = ({ ...rest }) => {
    const CenteredContainerRaw = styled('div')({
        borderRadius: '0',
        display: 'flex',
        justifyContent: 'center'
    });
    return <CenteredContainerRaw {...rest} />;
};
