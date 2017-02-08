import React, {Component} from 'react';
import update from 'immutability-helper';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Page from './Page';
import Sidebar from './Sidebar';

import uuidv4 from 'uuid/v4';

const sidebarSections = [
    {
        id: 1,
        title: "Text section",
        description: "This is a test section with couple paragraphs of text",
        content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis odio consequat, tempus lacus et, blandit orci. Aliquam erat volutpat. Sed in lectus dictum, varius ex sed, iaculis elit. Phasellus eu rutrum nibh. Donec sit amet ipsum ligula. Nunc id augue pretium, pellentesque urna euismod, congue nibh. Vivamus luctus, ex id maximus ultricies, elit mi rutrum magna, eu pellentesque ligula risus et libero. Nunc ornare nunc quis tellus tempor, quis finibus magna scelerisque. Aliquam maximus luctus urna ut efficitur. Mauris molestie nibh velit, id iaculis erat faucibus sed. Cras maximus aliquam viverra. Sed finibus justo nisl, id consequat mauris ultricies ac. Suspendisse id metus nibh.</p><p>Fusce sollicitudin nisi quis erat semper dictum. Aliquam euismod euismod tortor, at viverra odio placerat et. Ut ac dignissim risus, in suscipit arcu. Donec eget leo et orci pulvinar egestas vitae eu neque. Nulla posuere dolor et felis commodo posuere. Donec eu molestie dui. Phasellus quis mi sapien. Praesent dignissim pharetra lorem in consequat.</p>"
    },
    {
        id: 2,
        title: "Blockquote section",
        description: "This is a test section that contains blockquote example",
        content: "<blockquote><p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></blockquote>"
    },
    {
        id: 3,
        title: "Image section",
        description: "This is a test section that contains image",
        content: "<div><span style='margin: 10px'><a href='http://google.com' target='_blank'><img width='130' height='100' src='https://assets.servedby-buysellads.com/p/manage/asset/id/28536'/></a></span><span>90% Unlimited Downloads Choose from Over 300,000 Vectors, Graphics &amp; Photos.</span></div>"
    },
];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sidebarSections: sidebarSections,
            sections: []
        };
    }

    insertSection(sidebarSection, index) {
        let section = {
            id: uuidv4(),
            title: sidebarSection.title,
            content: sidebarSection.content
        };

        this.setState(update(this.state, {
            sections: {
                $splice: [
                    [index, 0, section]
                ],
            },
        }));
    }

    moveSection(sourceId, targetId) {
        let { sections } = this.state;
        let sectionByIdFilter = id => section => (section.id === id);
        let sourceIndex = sections.findIndex(sectionByIdFilter(sourceId));
        let targetIndex = sections.findIndex(sectionByIdFilter(targetId));

        this.setState(update(this.state, {
            sections: {
                $splice: [
                    [sourceIndex, 1],
                    [targetIndex, 0, sections[sourceIndex]],
                ],
            },
        }));
    }

    render() {
        return (
            <div>
                <div className="application-header">
                    <h1 className="application-title">React-DND test</h1>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <Page sections={this.state.sections}
                              onSectionMoved={(sourceId, targetId) => this.moveSection(sourceId, targetId)}
                              onSectionInserted={(sidebarSection, index) => this.insertSection(sidebarSection, index)}/>
                    </div>

                    <div className="col-sm-3 col-sm-offset-1">
                        <Sidebar sections={this.state.sidebarSections}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);