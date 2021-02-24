window.dom = {
    create: function (string) {
        const container = document.createElement
            ("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },//新建节点
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },//想把node2插入到node后面===找到这个节点的父类，调用insertBefore的方法，把node2插入到下一个节点的前面
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },//在前面新增一个节点
    append(parent, node) {
        parent.appendChild(node)
    },//新增子类
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },//增加父类
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },//删除一个节点，并返回
    empty(node) {
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    }, //删除一个对象的所有子类，并返回
    attribute(node, name, value) {//重载，根据参数个数写不同代码
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },//用于读写属性
    text(node, string) {//适配
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string
            } else {
                node.text.textContent = string
            }
        } else if (arguments.length === 1) {
            if ('innerText in node') {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },//用于读写文本内容
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },//用于读写HTML的内容
    style(node, name, value) {
        //dom.style(div,'color','red')
        if (arguments.length === 3) {
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div,'color')
                return node.style[name]
            } else if (name instanceof Object) {
                // dom.style(div, {color:'red'})
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children)
            .filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        while (x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while (x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (let i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
};
