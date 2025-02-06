import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const IndustryScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.viewContainer}>
        <Text style={styles.text1}>Direct Selling</Text>
        <Image
          source={require('../../assets/images/directselling.jpeg')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text2}>
          The direct selling industry is a dynamic sector that enables
          individuals to market and sell products directly to consumers,
          bypassing traditional retail channels. This model emphasizes personal
          relationships and community engagement, allowing sellers to build
          their own businesses from the ground up. Participants, often referred
          to as "distributors" or "consultants," earn commissions based on their
          sales and can also benefit from recruiting new members into their
          network. Historically, direct selling has been associated with
          industries like cosmetics, household goods, and wellness products, but
          it has evolved to encompass a wide variety of offerings, including
          tech gadgets, food products, and health supplements. This versatility
          appeals to diverse markets, providing opportunities for individuals to
          find products they are passionate about. One of the key features of
          the direct selling industry is its entrepreneurial spirit. Many people
          are drawn to the flexibility it offers, allowing them to set their own
          hours and work at their own pace. Additionally, the low startup costs
          compared to traditional business models make it an attractive option
          for many aspiring entrepreneurs. The rise of digital technology and
          social media has further transformed the landscape of direct selling.
          Online platforms enable sellers to reach a broader audience and
          leverage social networks for marketing, making it easier than ever to
          connect with potential customers. Despite its benefits, the industry
          faces challenges, including regulatory scrutiny and misconceptions
          about its legitimacy. However, many reputable companies emphasize
          ethical practices and transparency to foster trust and ensure
          compliance with legal standards. Overall, the direct selling industry
          continues to grow, providing individuals with unique opportunities for
          income and personal development while adapting to changing consumer
          behaviors and technological advancements.
        </Text>
      </View>
      <View style={styles.viewContainer2}>
        <Text style={styles.text1}>Wellness Indusrty</Text>
        <Image
          source={require('../../assets/images/wellness.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text2}>
          The wellness industry is a dynamic and rapidly expanding sector
          focused on improving overall well-being, encompassing physical,
          mental, emotional, and spiritual health. This industry covers a broad
          range of segments, including fitness, nutrition, mental health,
          personal care, alternative therapies, and wellness tourism. Driven by
          a global shift towards preventative health and self-care, the industry
          has seen exponential growth as consumers become more aware of the
          importance of a balanced and healthy lifestyle. Fitness programs such
          as yoga, pilates, and strength training have gained popularity, while
          nutrition has shifted towards organic, plant-based diets and
          supplements aimed at optimizing health. The rise of mindfulness
          practices like meditation and breathwork highlights the growing focus
          on mental well-being. Personal care products, such as natural
          skincare, are also part of the wellness trend, with an emphasis on
          sustainability and eco-conscious living. The integration of technology
          has revolutionized the wellness industry, offering tools like fitness
          tracking apps, mental health platforms, and personalized wellness
          plans powered by artificial intelligence. Wellness tourism is another
          growing trend, with travelers seeking holistic experiences through
          retreats and spa destinations. As health consciousness rises, the
          wellness industry is positioned to evolve further, blending
          traditional practices with cutting-edge innovations to cater to a
          global audience seeking better health and well-being.
        </Text>
      </View>
    </ScrollView>
  );
};

export default IndustryScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  viewContainer: {
    width,
    height: 1000,
    backgroundColor: '#d1ecf1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text1: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  image: {
    width: width,
    height: 150,
    marginTop: 20,
    marginBottom: 20,
  },
  text2: {
    fontSize: 16,
    color: '#555',
    textAlign: 'justify',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  viewContainer2: {
    width,
    height: 880,
    backgroundColor: '#d1ecf1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
