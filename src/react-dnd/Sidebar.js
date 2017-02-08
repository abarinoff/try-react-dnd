import React, {Component} from 'react';
import SidebarSection from './SidebarSection';

class Sidebar extends Component {
    render() {
        let sidebarSections = this.props.sections.map((section, index) => (
            <SidebarSection key={index} section={section}/>
        ));
        return (
            <div className="sidebar">
                { sidebarSections }
            </div>
        );
    }
}

export default Sidebar;
