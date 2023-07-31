import Tab from '@material-ui/core/Tab';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';
import {styled} from '@material-ui/core';
import {useState} from "react";

const StyledTabPanel = styled(TabPanel)({
    padding: '0.01rem'
});

const Tabs = ({tabs, indicatorColor, styling, tabMenuColor, defaultTabValue}) => {
    const [value, setValue] = useState(defaultTabValue || '0');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <TabContext value={value}>
                <div>
                    <TabList
                        onChange={handleChange}
                        style={{
                            borderBottom:    '1px solid #ccc',
                            backgroundColor: tabMenuColor
                        }}
                        indicatorColor={indicatorColor}
                    >
                        {tabs.map((tab, index) => (
                            <Tab
                                key={tab.key}
                                label={tab.label}
                                style={styling}
                                value={index.toString()}
                                data-qa={tab.key + '-Tab'}
                            />
                        ))}
                    </TabList>
                </div>
                {tabs.map((tab, index) => (
                    <StyledTabPanel
                        key={tab.key}
                        value={index.toString()}
                        data-qa={tab.key + '-TabPanel'}
                    >
                        {tab.content}
                    </StyledTabPanel>
                ))}
            </TabContext>
        </div>
    );
};

export default Tabs;
