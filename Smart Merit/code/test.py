l=[];
l.append('1');
l.append('2');
f = open('data','w');
for i in range(len(l)):
	f.write(l[i])
	f.write('\n');