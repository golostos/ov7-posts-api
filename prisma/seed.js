// @ts-check
const db = require("./db");
seed()
async function seed() {
    await db.post.deleteMany()
    const result = await db.post.createMany({
        data: [
            {
                author: "Wade",
                title: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
                text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam necessitatibus ipsa distinctio ratione! Voluptate non maiores odio, sit quas quam distinctio laudantium nobis ex, nam praesentium excepturi sint sunt perferendis culpa asperiores odit quaerat nulla! Vel aliquid tenetur quam repudiandae amet voluptatem iure ea explicabo voluptate ad, dolore id eveniet.",
            },
            {
                author: "Dave",
                title: "Soluta assumenda pariatur cum expedita modi nemo!",
                text: "Voluptates repudiandae, ipsa aut beatae maiores magnam pariatur. Cupiditate, voluptatum sunt. Odit nam adipisci accusamus qui voluptas enim voluptatibus eum. Officia dicta velit voluptatum aliquam commodi! Esse, quo ab. Mollitia quod harum nobis dolores animi, inventore explicabo cum sit voluptatibus blanditiis repellendus libero, non, dolorum adipisci cumque illum ex unde.",
            },
            {
                author: "Seth",
                title: "Voluptates corrupti impedit voluptas. Non, velit quos.",
                text: "Similique, nesciunt atque? Fugiat aperiam porro, labore soluta voluptas incidunt aspernatur sunt cupiditate doloribus nam ab exercitationem ipsum quae officia reiciendis sed quaerat facere quibusdam quam? Possimus, omnis adipisci quia eum voluptatum consequuntur odio enim! Voluptates quia ex excepturi dolorem, asperiores ipsum vitae ipsam corporis. Eos, vel suscipit! Neque, ipsum?",
            },
            {
                author: "Ivan",
                title: "Assumenda saepe reprehenderit quos non corrupti aperiam.",
                text: "Laudantium quo corporis nemo aliquid nulla numquam asperiores illum dolorem aspernatur similique, magni cumque cupiditate, nostrum fuga iusto. Porro facilis aliquam quos perspiciatis dignissimos at repudiandae voluptatum expedita, totam commodi ipsum saepe dolorum quam, inventore cupiditate explicabo eum ipsa autem. Eius, non sapiente eligendi deleniti quas atque. Omnis, voluptates ut!",
            },
            {
                author: "Riley",
                title: "Quam iure minus nam accusantium in dolorem.",
                text: "Incidunt obcaecati minima eligendi impedit unde, sed soluta tenetur qui ad maxime, officiis velit laudantium quis! At maiores saepe totam quo odio rem ipsa fugiat delectus distinctio deserunt eaque architecto dicta consequuntur dolor reprehenderit officiis, molestiae aliquam. Corrupti, doloribus recusandae nihil itaque vero voluptas, totam tempora tenetur commodi distinctio non.",
            },
            {
                author: "Gilbert",
                title: "Sit non magnam labore alias nisi unde?",
                text: "Fugiat natus, neque accusamus molestias vero ut laboriosam modi eaque suscipit ullam repudiandae vitae similique commodi, maiores consectetur amet cupiditate. Similique autem nisi ex ullam error iste placeat numquam minima iure exercitationem, corrupti consectetur ratione quam, a totam provident, id deserunt! Veniam tempore pariatur nostrum ratione, autem nihil quidem officia!",
            },
            {
                author: "Jorge",
                title: "Sint temporibus fugiat vero itaque excepturi est.",
                text: "Eos aspernatur adipisci libero. Nemo doloribus fugit saepe eum, doloremque natus ut cumque explicabo in iure eveniet eos ad laboriosam autem placeat eius voluptate. Ipsam, explicabo natus incidunt maiores unde saepe soluta placeat tenetur aspernatur assumenda aliquam illo molestias, culpa sint, deleniti possimus porro non odit laudantium nemo recusandae officiis.",
            },
            {
                author: "Dan",
                title: "Error dignissimos sunt tenetur, architecto ab odit!",
                text: "Iure assumenda rerum consequatur culpa aut delectus consequuntur deleniti totam quam asperiores officiis, nihil placeat temporibus magnam laudantium dolor labore, doloribus voluptas nisi! Quisquam quod unde ratione distinctio facere. Doloribus, pariatur facere? Assumenda recusandae, aut laudantium est pariatur numquam eligendi doloribus reprehenderit ducimus! Accusamus, quas reprehenderit eveniet ad doloribus quis?",
            },
            {
                author: "Brian",
                title: "Incidunt provident possimus sunt mollitia libero inventore?",
                text: "Alias inventore sint molestias tempore, dignissimos nostrum provident ducimus adipisci dolor, fuga odit dicta animi reprehenderit earum numquam perferendis corrupti sit. Commodi impedit sit magni nemo enim natus expedita exercitationem veniam incidunt. Facilis reiciendis accusamus qui dicta, consectetur labore adipisci reprehenderit porro numquam est dolores tempore nam dignissimos earum eos.",
            },
            {
                author: "Roberto",
                title: "Magni tempora ab omnis a architecto. Ducimus.",
                text: "Ab fugiat voluptatum modi cupiditate vel debitis officiis quidem reiciendis exercitationem nesciunt fuga assumenda eveniet accusantium, ullam voluptatibus, est illum atque ipsam numquam similique consectetur! Assumenda vel deleniti ducimus libero maiores nemo fuga, distinctio odit, esse error quod ea? Eligendi, commodi voluptatum repellat nihil asperiores mollitia illum rerum eos labore.",
            },
            {
                author: "Ramon",
                title: "Officia repudiandae explicabo perspiciatis tempore tempora labore.",
                text: "Amet a alias pariatur quas officia necessitatibus. Voluptates ex tenetur tempore quis aliquid maiores commodi harum accusantium repellat quibusdam. Quod nesciunt saepe quisquam. Voluptas dicta facere repellendus dolorem, explicabo culpa quis beatae aliquid enim! Blanditiis, ipsum dolorum. Quasi fuga, autem ipsum qui nam quia! Laboriosam pariatur ex sed magnam accusamus.",
            },
            {
                author: "Miles",
                title: "Sed iste eos veniam voluptatem dicta repudiandae?",
                text: "Laudantium earum harum quaerat molestiae distinctio minus assumenda, vitae rerum magnam itaque eveniet ipsa dolorem nemo deleniti cumque est sunt doloremque voluptates aliquid, debitis similique libero necessitatibus fugiat. Quis aspernatur nihil similique adipisci rem quae fugiat, maxime, provident temporibus voluptates sed! Enim itaque omnis et optio provident, quo corrupti necessitatibus.",
            },
            {
                author: "Liam",
                title: "Ullam vel, vitae illo enim ad adipisci?",
                text: "Facere quaerat, totam aspernatur magnam unde iure maiores, asperiores at libero optio illo consequatur sequi doloribus sunt nam. Quas sit mollitia explicabo, aspernatur suscipit eos dolorem soluta autem expedita possimus accusantium saepe assumenda debitis? Maiores, maxime laborum. Adipisci amet aspernatur ut inventore, quo nostrum culpa optio, nemo delectus, eum facilis!",
            },
            {
                author: "Nathaniel",
                title: "Dolorem placeat a, at rem accusantium minus!",
                text: "Labore at veritatis fuga quasi cum, repellendus quas ullam laborum dolorum illum dolores, ducimus corrupti doloribus possimus numquam maiores ea dicta iste magni quia dolor? Numquam, officia quisquam modi doloremque id fuga minus voluptates laboriosam deleniti aspernatur velit. Magni, in. Similique molestiae illo laborum eius pariatur modi odit saepe consequatur.",
            },
            {
                author: "Ethan",
                title: "Provident magni beatae assumenda possimus non dolor!",
                text: "Laboriosam illo nulla consequuntur saepe animi. Libero consequatur velit ex corrupti earum quidem debitis quis similique alias ab, dolor minima eveniet? Ad aspernatur maxime quae soluta quia omnis beatae provident consequatur esse, porro cum quod totam, similique dignissimos recusandae nobis quis facere repellat molestiae ea dolore! Tempora doloremque cum error?",
            },
            {
                author: "Lewis",
                title: "Officiis doloremque et quos perspiciatis cupiditate totam.",
                text: "Repudiandae, saepe fugiat natus aspernatur nemo facere temporibus laborum aliquam eaque molestias sed aliquid corrupti dicta distinctio vero provident voluptatum molestiae! Officia perspiciatis quia placeat laudantium quasi? Libero accusantium architecto doloribus. Commodi, tempora omnis sed minima eligendi dolor dicta eius optio, quisquam voluptatum beatae distinctio cum voluptates numquam quo maiores.",
            },
            {
                author: "Milton",
                title: "Esse ex quae unde repudiandae quibusdam optio!",
                text: "Necessitatibus eligendi nemo ipsa facilis fugit harum tenetur alias fuga veniam, magni eum quod exercitationem dolore enim non ex! Maiores voluptatum autem iste odit culpa omnis. Deleniti voluptatibus nisi totam aut veritatis fugiat non, doloribus consequuntur harum ullam dicta assumenda consequatur cum reprehenderit numquam dolores asperiores aliquid culpa. Id, porro.",
            },
            {
                author: "Claude",
                title: "Cum molestiae, ipsa itaque hic iure magnam!",
                text: "Officia architecto laboriosam vel qui blanditiis cupiditate sint repellendus veniam eum quidem? Earum atque id quis excepturi rem vel totam officia, fuga error dolorem tempora reprehenderit velit. Laudantium sequi delectus, aspernatur minus debitis sapiente officia, aut molestias inventore dicta odio odit, sit eum fugiat amet ipsum enim sunt ullam modi.",
            },
            {
                author: "Joshua",
                title: "Quam vel nam maiores ut libero quo!",
                text: "Suscipit recusandae in ipsum non a, sit pariatur neque molestiae sed adipisci eveniet nulla veniam, nobis dolorem repellendus tempora facilis cum, incidunt maxime animi! Ab similique sint aliquam assumenda consequatur esse voluptate mollitia voluptates repudiandae iste sit quo doloribus maxime corrupti aut, quasi est aspernatur veritatis? Illum ea cumque animi?",
            },
            {
                author: "Glen",
                title: "Aut itaque similique iure dolor distinctio doloribus?",
                text: "Deserunt expedita, officia modi laboriosam debitis tenetur minima molestiae, omnis vero dignissimos error sit necessitatibus ea mollitia nisi ex explicabo deleniti ullam similique sunt repudiandae, asperiores consequatur. Explicabo, sequi aut! Dolores rerum aliquam esse aspernatur eos similique voluptate nisi aliquid repellendus, porro veniam, sed culpa, hic optio quis. Voluptates, exercitationem.",
            }
        ]
    })
}