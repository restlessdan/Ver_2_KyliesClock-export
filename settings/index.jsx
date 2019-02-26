const colorSet = [
  {color: "black"},
  {color: "darkslategrey"},
  {color: "dimgrey"},
  {color: "grey"},
  {color: "lightgrey"},
  {color: "beige"},
  {color: "white"},
  {color: "maroon"},
  {color: "saddlebrown"},
  {color: "darkgoldenrod"},
  {color: "goldenrod"},
  {color: "rosybrown"},
  {color: "wheat"},
  {color: "navy"},
  {color: "blue"},
  {color: "dodgerblue"},
  {color: "deepskyblue"},
  {color: "aquamarine"},
  {color: "cyan"},
  {color: "olive"},
  {color: "darkgreen"},
  {color: "green"},
  {color: "springgreen"},
  {color: "limegreen"},
  {color: "palegreen"},
  {color: "lime"},
  {color: "greenyellow"},
  {color: "darkslateblue"},
  {color: "slateblue"},
  {color: "purple"},
  {color: "fuchsia"},
  {color: "plum"},
  {color: "orchid"},
  {color: "lavender"},
  {color: "darkkhaki"},
  {color: "khaki"},
  {color: "lemonchiffon"},
  {color: "yellow"},
  {color: "gold"},
  {color: "orangered"},
  {color: "orange"},
  {color: "coral"},
  {color: "lightpink"},
  {color: "palevioletred"},
  {color: "deeppink"},
  {color: "darkred"},
  {color: "crimson"},
  {color: "red"}       
];

const options = [
  ['Background Color', 'colorBackground'],
  ['Hour Hand Color', 'colorHourHand'],
  ['Minutes Hand Color', 'colorMinHand'],
];

function mySettings(props) {
  return (
    <Page>
      {options.map(([title, settingsKey]) =>
        <Section
          title={title}>
          <ColorSelect
            settingsKey={settingsKey}
            colors={colorSet} />
        </Section>
      )}
    </Page>
  );
}

registerSettingsPage(mySettings);

    /*<Page>      
      <Section
        title={<Text bold align="center">Clock Face</Text>}>
        
        <ColorSelect
          settingsKey="color"
          colors={[
            {color: "white"},
            {color: "#d0a1a8"},
            {color: "#b76e79"},
            {color: "tomato"},
            {color: "sandybrown"},
            {color: "#FFD700"},
            {color: "#ADFF2F"},
            {color: "deepskyblue"},
            {color: "plum"}
          ]}
        />
      </Section>
      
      <Section
        title={<Text bold align="center">Hour Hand</Text>}>
        
        <ColorSelect
          settingsKey="Hourcolor"
          colors={[
            {color: "tomato"},
            {color: "#d0a1a8"},
            {color: "#b76e79"},
            {color: "sandybrown"},
            {color: "#FFD700"},
            {color: "#ADFF2F"},
            {color: "deepskyblue"},
            {color: "plum"}
          ]}
        />
      </Section>
      
      <Section
        title={<Text bold align="center">Minute Hand</Text>}>
        
        <ColorSelect
          settingsKey="Minutecolor"
          colors={[
            {color: "tomato"},
            {color: "#d0a1a8"},
            {color: "#b76e79"},
            {color: "sandybrown"},
            {color: "#FFD700"},
            {color: "#ADFF2F"},
            {color: "deepskyblue"},
            {color: "plum"}
          ]}
        />
      </Section>
    </Page>
  );
*/