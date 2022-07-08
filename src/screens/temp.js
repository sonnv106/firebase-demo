<Header
ViewComponent={LinearGradient}
linearGradientProps={{
  colors: ["#F9B500", "#F9B500"],
}}
centerComponent={{
  text: "Danh sách sản phẩm",
  style: styles.heading,
}}
leftComponent={
  <View>
    {/* <Icon type="antdesign" name="home" color="white" /> */}
  </View>
}
rightComponent={
  <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
    <Icon type="antdesign" name="search1" />
  </TouchableOpacity>
}
/>