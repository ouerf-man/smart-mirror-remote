import * as React from "react"
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native"
import { Input, Overlay, Icon } from 'react-native-elements';
import { connect } from "react-redux"
import { GET_SCREEN_STATE_REQUESTED, UPDATE_SCREEN_STATE_REQUESTED } from "../redux/actions/screenState.action"
function Remote({
    screenState,
    loading,
    getScreen,
    updateScreen
}) {
    React.useEffect(() => {
        getScreen()
    }, [])
    const modules = [
        'searchQuery',
        'noteList',
        'longitude',
        'latitude',
        'videoID',
        "news",
        "timing",
        "forecast",
        "quotes",
        "note",
        "video"
    ]
    /* NOTES */
    const [note, setNote] = React.useState(false)
    const [noteModal, setNoteModal] = React.useState(false)
    const [notes, setNotes] = React.useState([])
    const [noteText, setNoteText] = React.useState(null)
    const handleNote = () => {
        if (!note) {
            setNoteModal(true)
        }
        updateScreen({
            note: !note
        })
    }
    const handleNoteBlur = (e) => {
        const aux = [...notes]
        if (noteText)
            aux.push(noteText)
        setNoteText(null)
        updateScreen({
            notesList: aux
        })
    }
    const deleteNote = (id) => {
        const aux = [...notes].filter((e, i) => i != id)
        setNotes(aux)
        updateScreen({
            notesList: notes
        })
    }

    /* VIDEO */
    const [video, setVideo] = React.useState(false)
    const [videoModal, setVideoModal] = React.useState(false)
    const [videoId, setVideoId] = React.useState(null)
    const handleVideo = () => {
        if (!video) {
            setVideoModal(true)
        }
        updateScreen({
            video: !video
        })
    }
    const handleVideoBlur = (e) => {
        updateScreen({
            videoID: videoId
        })
    }
    /* HORLOGE */
    const [horloge, setHorloge] = React.useState(false)
    const handleHorloge = () => {
        updateScreen({
            timing: !horloge
        })
    }
    /*QUOTES*/
    const [quotes, setQuotes] = React.useState(false)
    const handleQuotes = () => {
        updateScreen({
            quotes: !quotes
        })
    }
    /*FORECAST*/
    const [forecast, setForecast] = React.useState(false)
    const handleForecast = () => {
        updateScreen({
            forecast: !forecast
        })
    }
    /* NEWS */
    const [news, setNews] = React.useState(false)
    const [newsModal, setNewsModal] = React.useState(false)
    const [newsQuery, setNewsQuery] = React.useState(null)
    const handleNews = () => {
        if (!news) {
            setNewsModal(true)
        }
        updateScreen({
            news: !news
        })
    }
    const handleQueryBlur = (e) => {
        updateScreen({
            searchQuery: newsQuery
        })
    }
    React.useEffect(() => {
        setNote(screenState?.note)
        setNotes(screenState?.notesList || [])
        setVideo(screenState?.video)
        setVideoId(screenState?.videoID)
        setHorloge(screenState?.timing)
        setQuotes(screenState?.quotes)
        setForecast(screenState?.forecast)
        setNews(screenState?.news)
        setNewsQuery(screenState?.searchQuery)
    }, [screenState])
    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ ...styles.item, backgroundColor: note ? '#cecece' : "transparent" }} onTouchStart={handleNote} >
                    <Text style={styles.text}>Note</Text>
                </View>
                <View style={{ ...styles.item, backgroundColor: video ? '#cecece' : "transparent" }} onTouchStart={handleVideo} >
                    <Text style={styles.text}>Video</Text>
                </View>
                <View style={{ ...styles.item, backgroundColor: horloge ? '#cecece' : "transparent" }} onTouchStart={handleHorloge} >
                    <Text style={styles.text}>Horloge</Text>
                </View>
                <View style={{ ...styles.item, backgroundColor: quotes ? '#cecece' : "transparent" }} onTouchStart={handleQuotes} >
                    <Text style={styles.text}>Quotes</Text>
                </View>
                <View style={{ ...styles.item, backgroundColor: forecast ? '#cecece' : "transparent" }} onTouchStart={handleForecast} >
                    <Text style={styles.text}>Forecast</Text>
                </View>
                <View style={{ ...styles.item, backgroundColor: news ? '#cecece' : "transparent" }} onTouchStart={handleNews} >
                    <Text style={styles.text}>News</Text>
                </View>
            </ScrollView>
            <Overlay isVisible={noteModal} onBackdropPress={() => setNoteModal(!noteModal)} >
                <View style={{ paddingTop: 15, paddingLeft: 20, paddingRight: 20, paddingBottom: 25, width: Dimensions.get('window').width }}>
                    <Input
                        placeholder='Ajouter une note'
                        onBlur={handleNoteBlur}
                        value={noteText}
                        onChangeText={val => setNoteText(val)}
                    />
                    {
                        notes.map((e, i) => (
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 20
                            }}>
                                <Text key={i}>
                                    {e}
                                </Text>
                                <Icon
                                    name='times'
                                    type='font-awesome'
                                    color='red'
                                    onPress={() => deleteNote(i)} />
                            </View>
                        ))
                    }
                </View>
            </Overlay>
            <Overlay isVisible={videoModal} onBackdropPress={() => setVideoModal(!videoModal)} >
                <View style={{ paddingTop: 15, paddingLeft: 20, paddingRight: 20, paddingBottom: 25, width: Dimensions.get('window').width }}>
                    <Input
                        placeholder='Ajouter une note'
                        onBlur={handleVideoBlur}
                        value={videoId}
                        onChangeText={val => setVideoId(val)}
                    />
                </View>
            </Overlay>
            <Overlay isVisible={newsModal} onBackdropPress={() => setNewsModal(!newsModal)} >
                <View style={{ paddingTop: 15, paddingLeft: 20, paddingRight: 20, paddingBottom: 25, width: Dimensions.get('window').width }}>
                    <Input
                        placeholder='Ajouter une note'
                        onBlur={handleQueryBlur}
                        value={newsQuery}
                        onChangeText={val => setNewsQuery(val)}
                    />
                </View>
            </Overlay>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
        width: '50%', // is 50% of container width
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: .5,
        borderRadius: 5,
    },
    text: {
        fontSize: 12
    }
});

// Get state to props
const mapStateToProps = (state) => {
    const { screenState, loading } = state
    return {
        screenState,
        loading
    }
}

// Get dispatch / function to props
const mapDispatchToProps = (dispatch) => ({
    getScreen: () => dispatch({ type: GET_SCREEN_STATE_REQUESTED }),
    updateScreen: (body) => dispatch({ type: UPDATE_SCREEN_STATE_REQUESTED, payload: body }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Remote)