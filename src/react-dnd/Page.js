import React, {Component} from 'react';
import { DropTarget } from 'react-dnd';
import Section from './Section';
import PlaceholderSection from './PlaceholderSection';
import ItemTypes from './ItemTypes';

const pageTarget = {
    drop(props, monitor, component) {
        let sidebarSection = monitor.getItem();
        props.onSectionInserted(sidebarSection, component.state.placeholderIndex)
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isValidSource: monitor.canDrop()
    };
}

class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            placeholderIndex: -1
        }
    }

    onHoveredAboveBySidebarSection(targetSectionId) {
        let targetSectionIndex = this.props.sections.findIndex(section => (section.id === targetSectionId));
        this.setState({placeholderIndex: targetSectionIndex});
    }

    onHoveredBelowBySidebarSection(targetSectionId) {
        let targetSectionIndex = this.props.sections.findIndex(section => (section.id === targetSectionId));
        this.setState({placeholderIndex: targetSectionIndex + 1});
    }

    render() {
        const { sections, onSectionMoved, connectDropTarget, isOver, isValidSource } = this.props;

        let items = sections.map((section, index) => (
            <Section key={index} section={section} onSectionMoved={onSectionMoved}
                     onHoveredAboveBySidebarSection={targetSectionID => this.onHoveredAboveBySidebarSection(targetSectionID)}
                     onHoveredBelowBySidebarSection={targetSectionID => this.onHoveredBelowBySidebarSection(targetSectionID)}/>
        ));
        if(isOver && this.state.placeholderIndex >= 0) {
            items.splice(this.state.placeholderIndex, 0, <PlaceholderSection key="placeholder"/>);
        }

        return connectDropTarget(
            <div className={isValidSource || isOver ? "page isOver" : "page"}>
                { items }
            </div>
        );
    }
}

export default DropTarget(ItemTypes.SIDEBAR_SECTION, pageTarget, collect)(Page);