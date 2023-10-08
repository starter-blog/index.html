/*
You should use the standard input/output

in order to receive a score properly.

Do not use file input and output

Please be very careful. 
*/

#include <iostream>
#include <vector>
#include <set>

using namespace std;

long long Answer;
vector<long long> v;

long long add(int n) {
    if(v[n]) return v[n];
    if(n == 1) return 1;
    return v[n] = n + add(n - 1);
}

int main(int argc, char** argv)
{
	int T, test_case;
	/*
	   The freopen function below opens input.txt file in read only mode, and afterward,
	   the program will read from input.txt file instead of standard(keyboard) input.
	   To test your program, you may save input data in input.txt file,
	   and use freopen function to read from the file when using cin function.
	   You may remove the comment symbols(//) in the below statement and use it.
	   Use #include<cstdio> or #include <stdio.h> to use the function in your program.
	   But before submission, you must remove the freopen function or rewrite comment symbols(//).
	 */	

	// freopen("input.txt", "r", stdin);

	cin >> T;
	for(test_case = 0; test_case  < T; test_case++)
	{
        int n, suc = 0, combo = 0;
        int a = 0, b = 0;
        vector<int> last;
        string x;
        set<int> s;
		Answer = 0;
		/////////////////////////////////////////////////////////////////////////////////////////////
		/*
		   Implement your algorithm here.
		   The answer to the case will be stored in variable Answer.
		 */
		/////////////////////////////////////////////////////////////////////////////////////////////
		cin >> n >> x;
        v.assign(n, 0);
        for(int i = 0; i < n; i++) {
            switch (x[i]) {
                case '(':
                    a += 1;
                    last.push_back(0);
                    break;
                
                case '{':
                    b += 1;
                    last.push_back(1);
                    break;

                case ')':
                    if(last.size() && last[last.size() - 1] == 1) {
                        a = 0;
                        b = 0;
                        Answer += add(combo);
                        Answer += suc - 1;
                        last.clear();
                        combo = 0;
                    }
                    else {
                        a -= 1;
                        last.pop_back();
                        if(a == 0 && b == 0) combo += 1;
                        suc += 1;
                    }
                    break;
                    
                case '}':
                    if(last.size() && last[last.size() - 1] == 0) {
                        a = 0;
                        b = 0;
                        Answer += add(combo);
                        Answer += suc - 1;
                        last.clear();
                        combo = 0;
                    }
                    else {
                        b -= 1;
                        last.pop_back();
                        if(a == 0 && b == 0) combo += 1;
                        suc += 1;
                    }
                    break;
            } 
        }
        Answer += add(combo);
		// Print the answer to standard output(screen).
		cout << "Case #" << test_case+1 << endl;
		cout << Answer << endl;
	}

	return 0;//Your program should return 0 on normal termination.
}