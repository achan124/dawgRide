import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import Collapsible from 'react-native-collapsible';

// const FAQ_DATA = {
//   general: [
//     {
//       question: 'What do the icons on the map mean?',
//       answer: 'DawgRide is a mobile app that enhances the safety and convenience of late-night commutes for the UW community.',
//     },
//     {
//       question: 'How do I use DawgRide?',
//       answer: 'You can use DawgRide to access NightRide and SafeTrip services, view shuttle locations, and report safety concerns.',
//     },
//   ],
//   nightride: [
//     {
//       question: 'How do I identify the shuttle?',
//       answer: 'NightRide shuttles are white and purple ADA accessible shuttle buses with “Transportation Services” written on one side and a Dubs image displayed on the other.',
//     },
//     {
//       question: 'Where do I board the shuttle?',
//       answer: 'Except for the IMA and UW Tower stops, all stops share a King County Metro bus stop and are designated as NightRide stops by a decal posted on the bus schedule kiosk.',
//     },
//   ],
//   safetrip: [
//     {
//       question: 'What is SafeTrip?',
//       answer: 'SafeTrip provides safe vehicle escorts at night with a uniformed security guard for UW students, faculty, and staff.',
//     },
//     {
//       question: 'How do I book a SafeTrip?',
//       answer: 'You can book a SafeTrip by calling the dispatch center or using the DawgRide app.',
//     },
//   ],
// };

// const FAQItem = ({ question, answer, isActive, onPress }) => (
//   <View style={styles.faqItem}>
//     <TouchableOpacity onPress={onPress} style={styles.questionContainer}>
//       <Text style={styles.questionText}>{question}</Text>
//       <Text style={styles.arrow}>{isActive ? '▲' : '▼'}</Text>
//     </TouchableOpacity>
//     <Collapsible collapsed={!isActive}>
//       <Text style={styles.answerText}>{answer}</Text>
//     </Collapsible>
//   </View>
// );

const App = () => {
  const [activeTab, setActiveTab] = useState('general'); 

  // Function to render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralContent />;
      case 'nightride':
        return <NightRideContent />;
      case 'safetrip':
        return <SafeTripContent />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.heading1}>DawgRide</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'general' && styles.activeTab]}
          onPress={() => setActiveTab('general')}
        >
          <Text style={[styles.tabText, activeTab === 'general' && styles.activeText]}>General</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'nightride' && styles.activeTab]}
          onPress={() => setActiveTab('nightride')}
        >
          <Text style={[styles.tabText, activeTab === 'nightride' && styles.activeText]}>NightRide</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'safetrip' && styles.activeTab]}
          onPress={() => setActiveTab('safetrip')}
        >
          <Text style={[styles.tabText, activeTab === 'safetrip' && styles.activeText]}>SafeTrip</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.contentArea}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const GeneralContent = () => (
  <View style={styles.tabContent}>
    <Text style={styles.heading2}>How to use DawgRide</Text>
    <Text style={styles.text}>DawgRide is a mobile app that enhances the safety and convenience of late-night commutes for the
    UW community by building on existing Husky NightRide and SafeTrip services.</Text>
    <Text style={styles.heading3}>Frequently Asked Questions and Basic Information</Text>
    
    {/* {FAQ_DATA.nightride.map((item, index) => (
        <FAQItem
          key={index}
          question={item.question}
          answer={item.answer}
          isActive={activeIndex === index}
          onPress={() => setActiveIndex(activeIndex === index ? null : index)}
        />
      ))} */}

  </View>
);

const NightRideContent = () => (
  <View style={styles.tabContent}>
    <Text style={styles.heading2}>NightRide Shuttle</Text>
    <Text style={styles.heading3}>How it works</Text>
    <Text style={styles.text}>
      NightRide shuttles pick up passengers at one of eight scheduled stops around campus. 
      After the Flagpole stop, the last scheduled stop on campus, shuttles deviate from the fixed route to drop off riders at
      their requested location within the East or West zone boundaries. To be dropped off in the East zone,
      riders need to be on an East zone shuttle. Similarly, to be dropped off in the West zone, riders need to 
      be on a West zone shuttle. Riders can transfer from a West zone shuttle to an East zone shuttle or vice
      versa at the Flagpole stop. Review the Frequently asked questions for more information.
    </Text>
    <Text style={styles.heading3}>When it operates</Text>
    <Text style={styles.text}>
      Shuttles pick up passengers from 8 p.m. until 1:34 a.m. for the East zone and from 8 p.m. 
      until 1:39 a.m. for the West zone, Monday through Friday (excluding University holidays) during the Autumn, Winter
      and Spring quarters with extended service running until 3:30 a.m. the week before and the week of finals. Pick
      up time schedules for both zones are listed below.
    </Text>
    <Text style={styles.heading3}>Things to note</Text>
    <Text style={styles.text}>• Because the service allows for deviations, it may run behind schedule periodically.</Text>
    <Text style={styles.text}>• Please do not ask the driver to access an area that is challenging to navigate.</Text>
    <Text style={styles.heading3}>Frequently Asked Questions</Text>

    {/* {FAQ_DATA.nightride.map((item, index) => (
        <FAQItem
          key={index}
          question={item.question}
          answer={item.answer}
          isActive={activeIndex === index}
          onPress={() => setActiveIndex(activeIndex === index ? null : index)}
        />
      ))} */}

  </View>
);

const SafeTripContent = () => (
  <View style={styles.tabContent}>
    <Text style={styles.heading2}>Husky SafeTrip</Text>
    <Text style={styles.text}>Husky SafeTrip (formerly Husky NightWalk) provides safe vehicle escorts at night with 
      a uniformed security guard for UW students, faculty, and staff. Use Husky SafeTrip to get safely from campus to
      your home, your car, or another UW building within the service area.</Text>
    <Text>{'\n'}</Text>
    <Text style={styles.text}>⚠️ Not for routine transportation — Please use public transit or rideshare for grocery stores,
    restaurants, or other non-campus destinations.</Text>
    <Text style={styles.heading3}>How it works</Text>
    <Text style={styles.text}>1. Call 206-685-9255 when ready for a safety escort.</Text>
    <Text style={styles.text}>2. Provide the dispatcher with your location (building name or address).</Text>
    <Text style={styles.text}>3. Be outside and visible for pickup.</Text>
    <Text style={styles.text}>4.  Show your UW student, staff, or photo ID when requested.</Text>
    <Text style={styles.heading3}>When it operates</Text>
    <Text style={styles.text}>Hours: 6:30 p.m. – 2 a.m. daily. Not available on University holidays or when UW suspends operations.</Text>
    <Text style={styles.heading3}>Frequently asked questions</Text>

    {/* {FAQ_DATA.safetrip.map((item, index) => (
        <FAQItem
          key={index}
          question={item.question}
          answer={item.answer}
          isActive={activeIndex === index}
          onPress={() => setActiveIndex(activeIndex === index ? null : index)}
        />
      ))} */}

  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5A4A7B',
    flex: 1,
    paddingTop: 60,
    // paddingBottom: 20,
    // marginBottom: 90
  },

  heading1: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 20,
    marginTop: 20
  },

  tabButton: {
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: '#1A0A3A',
  },

  activeTab: {
    backgroundColor: '#E3DCEF', 
  },

  activeText: {
    color: 'black',
  },

  tabText: {
    color: 'white',
    fontSize: 16,
  },

  contentArea: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },

  tabContent: {
    marginTop: 20,
  },

  heading2: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  heading3: {
    color: '#594a7b',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20
  },

  text: {
    fontSize: 18
  }
});

export default App;