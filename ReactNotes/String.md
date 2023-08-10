---  
title: String      
permalink: ReactNotes/String      
category: ReactNotes      
parent: ReactNotes      
layout: default      
has_children: false      
share: true      
shortRepo:      
  - reactnotes      
  - default                
---  
    
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
    
# Text Manipulation    
    
## keep white space    
    
```javascript      
        <FieldDescription style={{whiteSpace: 'pre-wrap'}}>      
    {`    -Choose one or more of these options      
              CLIENT_ADMIN / RESULT_VIEWER / INTERVIEWER / REQUESTOR /      
              SCHEDULER / CLIENT_ADMIN / RESEARCH / COACH / ORDER_MANAGER /      
              TADMIN `}      
    <br/>      
</FieldDescription>       
```      
    
## add formatting to component    
    
```javascript      
      const createThemeToolTip = (themeSummary, significance) => {      
    return significance      
           ? <> {themeSummary}.      
            <i>      
                <FormattedMessage id="theme.significance.tooltip.label"/>      
            </i>      
           </>      
           : themeSummary;      
};      
```      
    
## dynamic internationalized component    
    
- [Internationalized text component](https://gist.github.com/14paxton/bd94c13e40f4faa41d65442d015b2a1f)    
    
## Dynamic tooltip    
    
- [Complex UseCase](https://gist.github.com/14paxton/9c745874ec384add89c1908c73832594)    
    
- [Simple UseCase](https://github.com/14paxton/ToolTipTextComponent)