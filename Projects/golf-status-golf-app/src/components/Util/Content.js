import {styled} from "@material-ui/core";

export const Content = ({ css, ...rest }) => {
    const ContentRaw = styled('div')({
        ...css
    });
    return <ContentRaw {...rest} />;
};
