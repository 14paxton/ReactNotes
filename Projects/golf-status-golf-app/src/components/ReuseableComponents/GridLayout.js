import {Button, makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    formContainerStyles:  {
        height: '90%'
    },
    gridContainer:        {
        backgroundColor: `${theme.palette.secondary}`,
        border:          '2px solid #E9EDF4',
        width:           '370px',
        paddingBottom:   10,
        marginBottom:    10
    },
    formAndButtonDivider: {
        borderTop: ` solid 2px ${theme.palette.divider}`,
        height:    10
    },
    buttons:              {
        minWidth: 137,
    }
}));


const GridLayout = props => {
    const {children, buttonArray} = props;
    const classes = useStyles()

    return (
        <Grid container className={classes.gridContainer}>
            <Grid item xs={12} className={classes.formContainerStyles}>
                {children}
            </Grid>
            <Grid item xs={12}>
                <div className={classes.formAndButtonDivider}>
                    <br/>
                </div>
            </Grid>
            {buttonArray?.map((buttonDataObject, index) => {
                return (
                    <Grid item xs={6} align="center" key={`form-button-${index}`}>
                        <Button
                            data-qa={`grid-button-${index}-${buttonDataObject?.label}`}
                            id={buttonDataObject?.id}
                            variant="contained"
                            form={buttonDataObject?.form}
                           type= {buttonDataObject?.type ? buttonDataObject?.type : 'button'}
                            color={buttonDataObject?.color
                                   ? buttonDataObject?.color
                                   : "primary"}
                            size="medium"
                            className={classes.buttons}
                            onClick={buttonDataObject?.action}
                        >
                            {buttonDataObject?.label}
                        </Button>
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default GridLayout;
