import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import flow from 'lodash/flow';


const sectionSource = {
    beginDrag(props) {
        return props.section;
    },
};

const sidebarSectionTarget = {
    hover(props, monitor, component) {
        const hoverSectionId = props.section.id;
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (hoverClientY < hoverMiddleY) {
            props.onHoveredAboveBySidebarSection(hoverSectionId);
        } else if (hoverClientY > hoverMiddleY) {
            props.onHoveredBelowBySidebarSection(hoverSectionId);
        }
    }
};

const sectionTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().id;
        const hoverIndex = props.section.id;

        if (dragIndex === hoverIndex) {
            return;
        }

        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        props.onSectionMoved(dragIndex, hoverIndex);
    },
};

class Section extends Component {
    render() {
        const { section, isDragging, connectDragSource, connectDropTarget, connectSidebarSectionDropTarget } = this.props;

        return connectDragSource(connectSidebarSectionDropTarget(connectDropTarget(
            <div className={isDragging ? "section isBeingDragged" : "section"}>
                <h2 className="section-title">{ section.title }</h2>
                <div className="section-content" dangerouslySetInnerHTML={{ __html: section.content}}/>
            </div>
        )));
    }
}

export default flow(
    DragSource(ItemTypes.SECTION, sectionSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    })),
    DropTarget(ItemTypes.SECTION, sectionTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    })),
    DropTarget(ItemTypes.SIDEBAR_SECTION, sidebarSectionTarget, connect => ({
        connectSidebarSectionDropTarget: connect.dropTarget()
    }))
)(Section);