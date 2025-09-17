import { StyleSheet, Text } from 'react-native'

const LatoText = ({ children, weight = "regular", style, ...props }) => {
  const fontMap = {
    regular: "LatoRegular",
    bold: "LatoBold",
    black: "LatoBlack",
    light: "LatoLight"
  }

  return (
    <Text
      style={[{ fontFamily: fontMap[weight] || fontMap.regular }, style]}
      {...props}
    >
      {children}
    </Text>
  )
}

export default LatoText

const styles = StyleSheet.create({})