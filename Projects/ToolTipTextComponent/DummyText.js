const OldValueText = styled(CellText)({
  textDecoration: 'line-through',
  backgroundColor: 'rgba(232, 98, 57, 0.2)'
});

 <TextComponent>
              <OldValueText
                data-qa={`cell-${cellData[0]}-${rowIndex}-old-value`}
                variant='body1'
                key={`${rowIndex}-${cellIndex}-old-value`}
                noWrap
              >
                {data.oldValue.dbValue}
              </OldValueText>
            </TextComponent>
