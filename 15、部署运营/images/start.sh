source /data/enote/.bash_profile
cd /data/enote/service-jar/system-base-service
nohup java -jar system-base-service.jar  -Xms=256m -Xmx=512m >/dev/null 2>/dev/null &

printf "\n start system-base-service，please wait..."
while [ 1 ] ; do
   num=`netstat -an  | grep -c 8074`
   if [ $num -ge 1 ]; then
      echo "OK!"
      exit 0;
   fi
   printf "."
   sleep 2
done

exit 0
