function TreeNode(value, color = 'red') {
    this.value = value;
    this.color = color;
    this.left = null;
    this.right = null;
    this.parent = null;
}
function showRedBlackTree() {
    window.location.href = 'index.html';
}

function showMinHeap() {
    window.location.href = 'work-in-progress.html';
}

function showMaxHeap() {
    window.location.href = 'work-in-progress.html';
}

let rootNode = null;

function rotateLeft(node) {
    const pivot = node.right;
    node.right = pivot.left;

    if (pivot.left) {
        pivot.left.parent = node;
    }

    pivot.parent = node.parent;

    if (!node.parent) {
        rootNode = pivot;
    } else {
        if (node === node.parent.left) {
            node.parent.left = pivot;
        } else {
            node.parent.right = pivot;
        }
    }

    pivot.left = node;
    node.parent = pivot;
}

function rotateRight(node) {
    const pivot = node.left;
    node.left = pivot.right;

    if (pivot.right) {
        pivot.right.parent = node;
    }

    pivot.parent = node.parent;

    if (!node.parent) {
        rootNode = pivot;
    } else {
        if (node === node.parent.right) {
            node.parent.right = pivot;
        } else {
            node.parent.left = pivot;
        }
    }

    pivot.right = node;
    node.parent = pivot;
}

function balanceRedBlackAfterInsert(node) {
    while (node.parent && node.parent.color === 'red') {
        if (node.parent === node.parent.parent.left) {
            const uncle = node.parent.parent.right;

            if (uncle && uncle.color === 'red') {
                node.parent.color = 'black';
                uncle.color = 'black';
                node.parent.parent.color = 'red';
                node = node.parent.parent;
            } else {
                if (node === node.parent.right) {
                    node = node.parent;
                    rotateLeft(node);
                }

                node.parent.color = 'black';
                node.parent.parent.color = 'red';
                rotateRight(node.parent.parent);
            }
        } else {
            const uncle = node.parent.parent.left;

            if (uncle && uncle.color === 'red') {
                node.parent.color = 'black';
                uncle.color = 'black';
                node.parent.parent.color = 'red';
                node = node.parent.parent;
            } else {
                if (node === node.parent.left) {
                    node = node.parent;
                    rotateRight(node);
                }

                node.parent.color = 'black';
                node.parent.parent.color = 'red';
                rotateLeft(node.parent.parent);
            }
        }
    }

    rootNode.color = 'black';
}

function insertNode(value) {
    if (value.trim() === "") {
        alert("Enter a non-empty numerical value");
        return;
    }

    if (isNaN(value)) {
        alert("Enter a numerical value");
        return;
    }

    const numericValue = parseFloat(value);

    if (numericValue < 0) {
        alert("Enter a non-negative value");
        return;
    }

    if (findNode(rootNode, numericValue)) {
        alert("Enter a non-duplicate value");
        return;
    }

    const newNode = new TreeNode(numericValue, 'red');

    if (!rootNode) {
        rootNode = newNode;
        rootNode.color = 'black';
    } else {
        insertNodeRecursive(rootNode, newNode);
        balanceRedBlackAfterInsert(newNode);
    }
    document.getElementById('nodeValue').value = '';
    drawTree();
}

function insertNodeRecursive(root, newNode) {
    if (newNode.value < root.value) {
        if (root.left === null) {
            root.left = newNode;
            newNode.parent = root;
        } else {
            insertNodeRecursive(root.left, newNode);
        }
    } else {
        if (root.right === null) {
            root.right = newNode;
            newNode.parent = root;
        } else {
            insertNodeRecursive(root.right, newNode);
        }
    }
}
function findNode(root, value) {
    if (!root) {
        return null;
    }
    if (value === root.value) {
        return root;
    } else if (value < root.value) {
        return findNode(root.left, value);
    } else {
        return findNode(root.right, value);
    }
}
function clearTree() {
    rootNode = null;
    drawTree();
}

function drawTree() {
    const canvas = document.getElementById('tree-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (rootNode) {
        const edgeScale = 2;
        drawNode(rootNode, canvas.width / 2, 50, 30, ctx, 1, edgeScale);
    }
    document.body.classList.add('grow');
}

function drawNode(node, x, y, radius, ctx, depth = 1, edgeScale = 1) {
    if (!node) {
        return;
    }

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = node.color;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = getTextColor(node.color);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '14px Arial';

    ctx.fillText(String(node.value), x, y);

    const verticalityFactor = 0.1;
    const verticalOffset = depth * verticalityFactor;

    if (node.left) {
        const childX = x - 100 * edgeScale / depth;
        const childY = y + 80 * edgeScale + verticalOffset;
        drawEdge(x, y, childX, childY, ctx);
        drawNode(node.left, childX, childY, radius, ctx, depth + 1, edgeScale);
    }

    if (node.right) {
        const childX = x + 100 * edgeScale / depth;
        const childY = y + 80 * edgeScale + verticalOffset;
        drawEdge(x, y, childX, childY, ctx);
        drawNode(node.right, childX, childY, radius, ctx, depth + 1, edgeScale);
    }
}

function getTextColor(nodeColor) {
    return nodeColor === 'black' ? 'white' : 'black';
}

function drawEdge(x1, y1, x2, y2, ctx) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
