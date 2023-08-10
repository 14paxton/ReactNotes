---  
title: Mat-Table      
permalink: ReactNotes/Mat-Table      
category: ReactNotes      
parent:   ReactNotes      
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
    
https://github.com/14paxton/TableWithAsyncCall/tree/main    
    
# Use ref to update table info in parent    
    
`const updatePrivateGroupsTable = () => {      
if (privateGroupTableRef?.current) {      
privateGroupTableRef.current.onQueryChange();      
}      
};`    
    
# misc.    
    
## table ref    
    
<https://stackoverflow.com/questions/56264459/how-can-i-use-tableref-onrowselected-to-update-the-ui-via-the-onrowclick-propert>    
    
## selectors <https://github.com/mbrn/material-table/issues/515>    
    
    - https://github.com/mbrn/material-table/issues/686      
    
## prop options to header from customize component    
    
![image5](https://user-images.githubusercontent.com/26972590/188926053-d48bcf30-3a9a-4d64-8a73-24c569724eeb.png)