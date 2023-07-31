import React, {forwardRef} from 'react';
import logo from "common/images/talent-plus-logo-white.png";
import {styled} from "@material-ui/styles";
import {Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";

const HeaderContent = styled('div')({
    alignItems:      'center',
    display:         'flex',
    justifyContent:  'space-between',
    margin:          'auto',
    padding:         '0 1rem',
    width:           '95%',
    whiteSpace:      'normal',
    backgroundColor: 'rgba(61,91,169,1)',
    minHeight:       '50px'
})

const HeaderContentLeft = styled('div')({
    width: '75%', alignItems: 'center', display: 'flex',
});

const ModalTitle = styled(Typography)({
    color: 'rgba(255,255,255,1)', textAlign: 'left', textTransform: 'uppercase', whiteSpace: 'nowrap', wordBreak: 'break-all', overflow: 'hidden', textOverflow: 'ellipsis'
})

const StyledCard = styled(Card)({
    backgroundColor: 'rgba(61,91,169,1)', borderBottom: '4px solid rgba(61,91,169,1)', borderRadius: 15, height: 50
})

const PPTTableHeader = forwardRef(function TableHeader(props, ref) {
    const {assessmentName, nameForGridGrouping} = props
    return (<StyledCard
        id={'ppt_table_header'}
        width={'100%'}
        ref={ref}
    ><HeaderContent>
        <HeaderContentLeft

        >
            <ModalTitle variant="h4">
                {`${nameForGridGrouping}: ${assessmentName}`}
            </ModalTitle>
        </HeaderContentLeft>
        <img
            alt="Talent Plus, Inc"
            height={'35%'}
            src={logo}
            width={'10%'}
        />
    </HeaderContent></StyledCard>);
})

const PPTHeader = forwardRef((props, ref) => {
    return (<PPTTableHeader ref={ref} {...props}/>)
})

export default PPTHeader;
