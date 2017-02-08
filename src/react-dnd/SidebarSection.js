import React, {Component} from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

const sidebarSectionSource = {
    beginDrag(props) {
        return props.section;
    }/*,

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            console.log("Wasn't dropped anywhere");
        } else {
            console.log("Was dropped", monitor.getDropResult());
        }
    }*/
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

class SidebarSection extends Component {
    render() {
        const { section, isDragging, connectDragSource } = this.props;

        return connectDragSource(
            <div className={isDragging ? "sidebar-section isBeingDragged" : "sidebar-section"}>
                <h4>{ section.title }</h4>
                <p>{ section.description }</p>
            </div>
        );
    }
}

export default DragSource(ItemTypes.SIDEBAR_SECTION, sidebarSectionSource, collect)(SidebarSection);