'use strict';

var constants = require('../utils/constants.js');
const network = require('../libs/fabric-lib/food-supply-chain-network.js');

var Org = class {

    constructor(opts) {
        this.id = opts.id,
        this.objectType = opts.objectType || constants.ObjectTypes.Org,
        this.parent = opts.parent,
        this.name = opts.name,
        this.content = (opts.content && opts.content instanceof Object) ? 
                        JSON.stringify(opts.content) : opts.content;
    }

    toString()
    {        
        let orgStr = '';
        if(this.traceable && this.traceable.length > 0 && this.traceable[0])
        {
            let org = this.traceable[0];
            orgStr = "[ org-id: " + org.ID + " , name: " + org.name + 
                " , objectType: " + org.objectType + " , content: " + org.content + " ]";   
        }
        return orgStr;
    }

    static create(orgData)
    {
        if(orgData)
            return network.invoke('initOrgData', orgData);
    }

    create()
    {
        return network.invoke('createTraceable', this);
    }

    update()
    {
        return network.invoke('updateTraceable', this);        
    }

    static find(id)
    {
        let objectType = constants.ObjectTypes.Org;
        return network.query('getObject', id, objectType);
    }
}

module.exports = Org;