Round 1 : DSA - Find Second Largest in BST Optimized way . Don't sort . 




/*
================================================================
  SECOND LARGEST IN BST
================================================================
A Binary Search Tree (BST) is a binary tree where, for every node:
  - All values in its LEFT subtree are LESS than the node's value
  - All values in its RIGHT subtree are GREATER than the node's value
  - All values are unique

Given the ROOT of a BST, find and return the SECOND LARGEST value
in the tree.

REQUIREMENTS:
  1. Return the second largest value as a number.
  2. If the tree has fewer than 2 nodes, return null.
  3. The tree can be unbalanced — handle deep trees without crashing.
  4. Be efficient — use the BST property, don't sort all values.

COMPLEXITY EXPECTATIONS:
  - Time:  O(h), where h = height of the tree.
  - Space: O(1) auxiliary (iterative; no recursion stack).
  - Higher-complexity solutions (O(n), O(n log n)) are NOT accepted.

TIME EXPECTATION:
  - Target completion: 30 minutes end-to-end.

HOW TO RUN THE TESTS:
  - Implement secondLargest(root) below.
  - Run the file (node, or any online JS compiler). The tests at
    the bottom run automatically and print PASS/FAIL for each case.
  - Do NOT modify the TreeNode class or the test runner.
================================================================
*/


// ===== TreeNode class — do not modify =====
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}


// ================================================================
//  YOUR CODE GOES HERE
// ================================================================

//  Self in Interview Optimized Approach - Failing for 3 Test Cases
// Wrong Solution
function secondLargestA(root) {
    const util = (ptr)=>{
        if(ptr == null ) return null ;
        count+=1 ;
        if(ptr.right ){
            secLarg = Math.max(secLarg , ptr.val);
            larg = Math.max(larg , ptr.right.val);
            util(ptr.right);
        }
        
        if(ptr.left){
            secLarg = Math.max(secLarg , ptr.left.val);
            larg = Math.max(larg , ptr.val);
            util(ptr.left);
        }
        return null ;
    }
  
    let count = 0 ;
    let larg = -Infinity ;
    let secLarg = -Infinity ;
    util(root);
    
    if(count < 2) return null ;
    return secLarg ;
}

// Self in Interview Postorder Approach - Passed all test cases 
function secondLargestB(root) {
       const util = (ptr)=>{
          if(ptr == null) return ;
          util(ptr.right);
          post.push(ptr.val);
          util(ptr.left); 
        }
      
      let post = [];
      util(root);
      return post[1];
}

// Real Most Optimized One
// Easy One - Are BST Hai , to second largest k liye sirf right me hi jana chahiye . Second largest k liye ek parent variable
// store karlo , isi me hoga second largest . 
// Special CASE : Jab Skew tree ho to ek baar left check krne ka , or fir waise hi hoga . Easy hi hai thoda sochne ka . 
function secondLargestCorrect(root) {
    if (!root || (!root.left && !root.right)) {
        return null; // or throw an error
    }
    let current = root ;
    let parent = null ;
    
    while(current.right != null){
        parent = current ;
        current = current.right ;
    }
    
    if(current.left == null){
        return parent.val ;
    }
    
    current = current.left ;
    
    while(current.right != null){
        parent = current ;
        current = current.right ;
    }
    return current.val ;
}


// ================================================================
//  TEST RUNNER — do not modify below this line
// ================================================================
const _state = { passed: 0, failed: 0, failures: [] };

function _check(name, got, expected) {
  // strict equality, with null/undefined treated as the same null
  const norm = (v) => (v === undefined ? null : v);
  if (norm(got) === norm(expected)) {
    _state.passed++;
    console.log(`  PASS  ${name}`);
  } else {
    _state.failed++;
    _state.failures.push(name);
    console.log(`  FAIL  ${name}`);
    console.log(`        expected: ${expected}`);
    console.log(`        got:      ${got}`);
  }
}

function _runTest(name, fn) {
  console.log(`\n[${name}]`);
  try {
    fn();
  } catch (e) {
    _state.failed++;
    _state.failures.push(`${name} (threw)`);
    console.log(`  FAIL  ${name} THREW: ${e.message}`);
  }
}

function _insert(node, val) {
  const newNode = new TreeNode(val);
  if (node === null) return newNode;
  let current = node;
  while (true) {
    if (val < current.val) {
      if (current.left === null) { current.left = newNode; return node; }
      current = current.left;
    } else {
      if (current.right === null) { current.right = newNode; return node; }
      current = current.right;
    }
  }
}

function _buildBst(values) {
  let root = null;
  for (const v of values) root = _insert(root, v);
  return root;
}


// ================================================================
//  TEST CASES — invoked on run
// ================================================================
(function main() {
  const check = _check;
  const runTest = _runTest;
  const buildBst = _buildBst;

  runTest('Test 1: standard balanced tree', () =>
    check('expected 20', secondLargest(buildBst([20, 8, 22, 4, 12])), 20)
  );

  runTest('Test 2: largest has no left subtree', () =>
    check('expected 7', secondLargest(buildBst([5, 3, 7, 9])), 7)
  );

  runTest('Test 3: empty tree returns null', () =>
    check('null for empty tree', secondLargest(null), null)
  );

  runTest('Test 4: single node tree returns null', () =>
    check('null for single node', secondLargest(new TreeNode(5)), null)
  );

  runTest('Test 5: right-skewed (1->2->3->4->5)', () =>
    check('expected 4', secondLargest(buildBst([1, 2, 3, 4, 5])), 4)
  );

  runTest('Test 6: left-skewed (5->4->3->2->1)', () =>
    check('expected 4', secondLargest(buildBst([5, 4, 3, 2, 1])), 4)
  );

  runTest('Test 7: root with left subtree only', () =>
    check('expected 7', secondLargest(buildBst([10, 5, 3, 7])), 7)
  );

  runTest('Test 8: two-node tree, root smaller', () =>
    check('expected 5', secondLargest(buildBst([5, 10])), 5)
  );

  runTest('Test 9: two-node tree, root larger', () =>
    check('expected 5', secondLargest(buildBst([10, 5])), 5)
  );

  runTest('Test 10: largest has deep left subtree', () =>
    check('expected 20', secondLargest(buildBst([20, 10, 25, 5, 15, 12, 18, 19])), 20)
  );

  runTest('Test 11: largest has left subtree with right chain', () =>
    check('expected 19', secondLargest(buildBst([20, 10, 18, 15, 19])), 19)
  );

  runTest('Test 12: negative numbers work', () =>
    check('expected -5', secondLargest(buildBst([-5, -10, -2])), -5)
  );

  runTest('Test 13: deep tree (500 nodes), does not crash', () => {
    const arr = Array.from({ length: 500 }, (_, i) => i);
    const root = buildBst(arr);
    check('expected 498', secondLargest(root), 498);
  });

  runTest('Test 14: left subtree with multiple branches', () =>
    check('expected 65', secondLargest(buildBst([50, 30, 70, 60, 52, 65])), 65)
  );

  console.log('\n=================================');
  console.log(`PASSED: ${_state.passed}    FAILED: ${_state.failed}`);
  console.log('=================================');
  if (_state.failed > 0) {
    console.log('\nFailures:');
    for (const f of _state.failures) console.log(`  - ${f}`);
  }
})();




