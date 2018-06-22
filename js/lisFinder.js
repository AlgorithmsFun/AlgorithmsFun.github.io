function main(){
    try{
        var raw_input=document.getElementById('numSeq').value.toString().split(",");
        if(raw_input!=""){
            var input_sequence=new Array(raw_input.length);
            for(i=0;i<raw_input.length;i++){
                input_sequence[i]=parseInt(raw_input[i]);
            }
            var a=input_sequence;

            var b=lis_subsequence_lengths_finder(a);
            var c=lis_index_sequence_finder(a,b);
            var d=longest_increasing_subsequence_finder(b,c,a);
            
            document.getElementById('lis').value=d;
        }
        else{
            document.getElementById('lis').value="warning: enter inputs";
        }
    
    }catch(e){
        document.getElementById('lis').value=e;
    }
}
	
main();
	
function max(a,b) {
    return (a>b)?a:b;
}
function random_sequence(){
    var a=document.getElementById('sNum').value;
    var b=document.getElementById('eNum').value;
    var d=document.getElementById('seqLen').value;
    var e=new Array();
    for(i=0;i<d;i++){
        var c=Math.round(Math.random()*b);
        while(c<=a||c>=b){
            c=Math.round(Math.random()*b);
        }
        e[i]=c;
    }
    document.getElementById('ranlis').value=e;
}

function array_max_index(a) {
    var size=a.length;
    var max=a[0];
    var max_index=0;
    for(i=0;i<size;i++) {
        if(a[i]>=max) {
            max=a[i];
            max_index=i;
        }
    }
    return max_index;
}
	
function lis_subsequence_lengths_finder(number_sequence_array) {
    var size=number_sequence_array.length;
    var subsequences_lengths_array=new Array(size);
    
    for(i=0;i<size;i++) {
        subsequences_lengths_array[i]=1;
    }
    for(i=1;i<size;i++) {
        for(j=0;j<i;j++) {
        if(number_sequence_array[i]>=number_sequence_array[j]) {
            if(subsequences_lengths_array[j]+1>=subsequences_lengths_array[i]) {
                subsequences_lengths_array[i]=max(subsequences_lengths_array[j]+1,subsequences_lengths_array[i]);
                }	
            }
        }
    }
    return subsequences_lengths_array;
}

function lis_index_sequence_finder(number_sequence,subsequences_lengths_array) {
		var size=number_sequence.length;
		var longest_sub_sequence_index_array=new Array(size);
        
        for(i=0;i<size;i++){
            longest_sub_sequence_index_array[i]=0;
        }
    
		for(i=1;i<size;i++) {
			for(j=0;j<i;j++) {
				if(number_sequence[i]>=number_sequence[j]) {
					if(subsequences_lengths_array[j]+1>=subsequences_lengths_array[i]) {
						longest_sub_sequence_index_array[i]=j;
					}
				}
			}
		}
		return longest_sub_sequence_index_array;
	}

function longest_increasing_subsequence_finder(subsequences_lengths_array,longest_subsequence_index_array,number_sequence) {
		
		var max_subsequence_length_index=array_max_index(subsequences_lengths_array);
        
		var longest_increasing_subsequence=new Array(subsequences_lengths_array[max_subsequence_length_index]);
		var i=max_subsequence_length_index;
		var j=subsequences_lengths_array[max_subsequence_length_index]-1;

		
		do{
			longest_increasing_subsequence[j]=number_sequence[i];
			i=longest_subsequence_index_array[i];
			j--;
		}while(j>-1);
		
		return longest_increasing_subsequence;
}

