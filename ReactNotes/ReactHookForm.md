---  
title:        ReactHookForm      
permalink:    ReactNotes/ReactHookForm      
category:     ReactNotes      
parent:       ReactNotes      
layout:       default      
has_children: false      
share:        true      
shortRepo:      
  - reactnotes      
  - default                
---  
    
{% raw %}      
<br/>    
    
<details markdown="block">                      
<summary>                      
Table of contents                      
</summary>                      
{: .text-delta }                      
1. TOC                      
{:toc}                      
</details>                      
    
<br/>                      
    
***                      
    
<br/>      
    
# [React Hook Forms Components](https://github.com/14paxton/ReactHookFormDynamicComponents)    
    
      
---  
    
# testing context    
    
<https://medium.com/javascript-in-plain-english/using-react-hook-form-in-component-tests-497180abf3c0>    
    
```javascript      
      
function renderWithReactHookForm(ui, {defaultValues = {}} = {}) {      
    const Wrapper = ({children}) => {      
        const methods =      
      
                  useForm({defaultValues});      
        return (<LanguageProvider>      
            <FormProvider {...methods}>{children}</FormProvider>      
        </LanguageProvider>);      
    };      
      
    return {      
        ...render(ui, {wrapper: Wrapper})      
    };      
}      
      
describe('BasicSearch', () => {      
    beforeEach(() => {      
        renderWithReactHookForm(<BasicSearch/>, {      
            defaultValues: {      
                firstName: 'Vic', lastName: 'Vinegar'      
            }      
        });      
    });      
      
    it('BasicSearch should render withouth crashing', async () => {      
        expect(screen.getByTestId('group-first-name-search-input'));      
    });      
      
    it('first and last name inputs should have value', async () => {      
        expect(screen.getByTestId('group-first-name-search-input').value).toEqual('Vic');      
        expect(screen.getByTestId('group-last-name-search-input').value).toEqual('Vinegar');      
    });      
});      
      
-fire      
submit      
from      
parent      
      
const submitMyForm = (data) => {      
    formRef.current.dispatchEvent(new Event('submit', {      
        cancelable: true, bubbles: true      
    }))      
}      
      
```      
    
# using controller component with select and autocomplete    
    
```javascript      
<Controller      
    name={"users"}      
    control={control}      
    rules={{      
        required: "One user is required",      
        validate: value => value.length < 11      
                           ? true      
                           : "Max of 10 results may be shared at a time. "      
    }}      
    render={({onChange, value, ref, ...props}) => (<Autocomplete      
        multiple      
        id="tags-standard"      
        options={userIds}      
        onChange={(e, data) => onChange(data)}      
        getOptionLabel={option => `${userOptions[option].firstName} ${userOptions[option].lastName}`}      
        filterSelectedOptions      
        renderTags={(value, getTagProps) => value.map((option, index) => (<Chip      
            color="primary"      
            label={`${userOptions[option].firstName} ${userOptions[option].lastName}`}      
            {...getTagProps({index})}      
        />))}      
        renderInput={params => (<TextField      
            {...params}      
            variant="outlined"      
            label="Search Users"      
            placeholder="Enter first name and/or last name"      
            InputLabelProps={{      
                shrink: true, "data-qa": "score-sheet-result-statement-label", style: {      
                    fontSize: "20px", color: "black", display: "block", fontFamily: "Open Sans, sans-serif", fontWeight: 700      
                }      
            }}      
            error={!!errors?.users}      
            helperText={errors?.users?.message}      
        />)}      
        {...props}      
    />)}      
/>      
```      
    
```javascript      
<Controller      
    name={"testSelect"}      
    control={control}      
    defaultValue={currency}      
    render={({onChange, ...props}) => (<TextField      
        id="standard-select-currency"      
        select      
        label="Select"      
        onChange={(e, data) => onChange(data.props.value)}      
        helperText="Please select your currency"      
        {...props}      
    >      
        {currencies.map(option => (<MenuItem key={option.value} value={option.value}>      
            {option.label}      
        </MenuItem>))}      
    </TextField>)}      
/>      
```      
    
{% endraw %}