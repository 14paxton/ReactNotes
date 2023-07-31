import {Card, Typography} from "@material-ui/core";
import {CenteredContainer} from "../Util/CenteredContainer";
import {Content} from "../Util/Content";

const EmptyTable = (props) => {
    const { title } = props;
    return (
        <Card data-qa={'empty-table-card'}>
            {title}
            <CenteredContainer border={'true'}>
                <Content>
                    <Typography
                        key={'no-content-label-1'}
                        variant="h2"
                        data-qa={'no-content-label-1'}
                    >
                        {props.msg1}
                    </Typography>
                    <Typography
                        key={'no-content-label-2'}
                        variant="body1"
                        data-qa={'no-content-label-2'}
                    >
                        {props.msg2}
                    </Typography>
                </Content>
            </CenteredContainer>
        </Card>
    );
};

export default EmptyTable;
